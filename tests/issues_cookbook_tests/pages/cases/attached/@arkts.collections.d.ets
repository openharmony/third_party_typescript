declare namespace collections {
  class Array<T> {
    [k: number]: T; // should NOT report, arkts-no-indexed-signatures
    [s: string]: T; // should report, arkts-no-indexed-signatures
  }

  class Set<T> {
    [k: number]: T; // should report, arkts-no-indexed-signatures
    [s: string]: T; // should report, arkts-no-indexed-signatures
  }
}

declare namespace utils {
  class Array<T> {
    [k: number]: T; // should report, arkts-no-indexed-signatures
    [s: string]: T; // should report, arkts-no-indexed-signatures
  }

  class Set<T> {
    [k: number]: T; // should report, arkts-no-indexed-signatures
    [s: string]: T; // should report, arkts-no-indexed-signatures
  }
}

export default collections;