export default class CompareFunctions {
  compareAlphFilename = (a, b) => {
    if (a.originalName > b.originalName) {
      return 1;
    }
    if (b.originalName > a.originalName) {
      return -1;
    }
    return 0;
  };
  compareAlphFilenameReverse = (a, b) => {
    if (a.originalName > b.originalName) {
      return -1;
    }
    if (b.originalName > a.originalName) {
      return 1;
    }
    return 0;
  };
  compareUploadDate = (a, b) => {
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    if (b.createdAt > a.createdAt) {
      return -1;
    }
    return 0;
  };
  compareUploadDateReverse = (a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (b.createdAt > a.createdAt) {
      return 1;
    }
    return 0;
  };
  compareExpireDate = (a, b) => {
    if (a.expireDate > b.expireDate) {
      return 1;
    }
    if (b.expireDate > a.expireDate) {
      return -1;
    }
    return 0;
  };
  compareExpireDateReverse = (a, b) => {
    if (a.expireDate > b.expireDate) {
      return -1;
    }
    if (b.expireDate > a.expireDate) {
      return 1;
    }
    return 0;
  };
  compareMimeType = (a, b) => {
    if (a.mimeType > b.mimeType) {
      return -1;
    }
    if (b.mimeType > a.mimeType) {
      return 1;
    }
    return 0;
  };
}
