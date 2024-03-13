class C1{
  static a:number=1
  static {
  }
  static { // should report error arkts-no-multiple-static-block
  }
}

class C2{
  static a:number=1
  static {
    this.a // should report error arkts-no-standalone-this
  }
}

class C{
  static a:number=1
  static {
    class C{
    }
  }
  static { // should report error arkts-no-multiple-static-block
  }
}

class C3{
  static a:number=1
  static f() {
    class C3{
      static {}
    }
  }
  static { // should NOT report error
  }
}


export let other = 1;