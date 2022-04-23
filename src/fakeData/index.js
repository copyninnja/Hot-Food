import breakfast from "./breakfast";
import burger from "./burger";
import commidity from "./commidity";
import dinner from "./dinner";
import drinks from "./drinks";
import icecream from "./icecream";
import lunch from "./lunch";
import pizza from "./pizza";
import restaurants from "./restaurants";
import sandwich from "./sandwich";
import shawarma from "./shawarma";

const fakeData = [
  ...dinner,
  ...lunch,
  ...breakfast,
  ...pizza,
  ...burger,
  ...sandwich,
  ...shawarma,
  ...icecream,
  ...drinks,
];

// const shuffle = a => {
//     for (let i = a.length; i; i--) {
//         let j = Math.floor(Math.random() * i);
//         [a[i - 1], a[j]] = [a[j], a[i - 1]];
//     }
// }

export default fakeData;
