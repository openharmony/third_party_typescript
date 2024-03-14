function notify(who: string, what: string) {
  console.log(`Dear ${who}, a message for you: ${what}`)
}
notify("Jack", "You look great today")
notify(null, undefined) // should report


export let other = 1;