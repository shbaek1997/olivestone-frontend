//Compare functions for JS in built array sort function
export default class CompareFunctions {
  compareAlphUserName = (a, b) => {
    if (a.fullname > b.fullname) {
      return 1;
    }
    if (b.fullname > a.fullname) {
      return -1;
    }
    return 0;
  };
  compareAlphUserEmail = (a, b) => {
    if (a.email > b.email) {
      return 1;
    }
    if (b.email > a.email) {
      return -1;
    }
    return 0;
  };
  compareAlphUserRole = (a, b) => {
    if (a.role > b.role) {
      return 1;
    }
    if (b.role > a.role) {
      return -1;
    }
    return 0;
  };
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
  compareUploader = (a, b) => {
    if (a.uploaderEmail > b.uploaderEmail) {
      return 1;
    }
    if (b.uploaderEmail > a.uploaderEmail) {
      return -1;
    }
    return 0;
  };
}
