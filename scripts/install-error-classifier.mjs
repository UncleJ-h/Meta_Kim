function asText(errorLike) {
  if (typeof errorLike === "string") {
    return errorLike;
  }
  if (errorLike && typeof errorLike === "object") {
    return [errorLike.message, errorLike.stderr, errorLike.stdout]
      .filter(Boolean)
      .join("\n");
  }
  return "";
}

export function classifyGitInstallFailure(errorLike) {
  const text = asText(errorLike).toLowerCase();

  if (
    text.includes("schannel: failed to receive handshake") ||
    text.includes("ssl/tls connection failed") ||
    text.includes("gnutls_handshake() failed") ||
    text.includes("server certificate verification failed") ||
    text.includes("ssl certificate problem") ||
    text.includes("tlsv1 alert") ||
    text.includes("tls connect error") ||
    text.includes("unexpected eof while reading")
  ) {
    return "tls_transport";
  }

  if (text.includes("repository") && text.includes("not found")) {
    return "repo_not_found";
  }

  if (
    text.includes("authentication failed") ||
    text.includes("could not read username")
  ) {
    return "auth_required";
  }

  if (text.includes("sparse checkout path missing")) {
    return "subdir_missing";
  }

  if (
    text.includes("failed to connect to") ||
    text.includes("could not connect to server") ||
    text.includes("connection refused") ||
    text.includes("connection timed out") ||
    text.includes("network is unreachable") ||
    text.includes("no route to host")
  ) {
    return "proxy_network";
  }

  if (
    text.includes("permission denied") ||
    text.includes("access denied") ||
    text.includes("operation not permitted") ||
    text.includes("eacces") ||
    text.includes("eperm")
  ) {
    return "permission_denied";
  }

  if (
    text.includes("command not found") ||
    text.includes("is not recognized as") ||
    text.includes("no such file or directory") ||
    text.includes("enoent") ||
    text.includes("not installed") ||
    (text.includes("python") && text.includes("not found"))
  ) {
    return "missing_runtime";
  }

  return "unknown";
}

export function shouldUseArchiveFallback(category) {
  return category === "tls_transport";
}

export function parseGitHubRepoUrl(repoUrl) {
  const match = /^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i.exec(
    repoUrl.trim(),
  );
  if (!match) {
    return null;
  }
  return {
    owner: match[1],
    repo: match[2],
  };
}

export function buildGitHubTarballUrl(repoUrl) {
  const parsed = parseGitHubRepoUrl(repoUrl);
  if (!parsed) {
    return null;
  }
  return `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/tarball`;
}
