const date = new Date();
const monthNames = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

let year = date.getFullYear();
let month = date.getMonth() + 1;

// コマンドライン引数の解析（-m と -y の順不同・片方のみ指定に対応）
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  const flag = args[i];
  const val = Number(args[i + 1]);

  if (flag === "-m" && Number.isInteger(val) && val >= 1 && val <= 12) {
    month = val;
  } else if (flag === "-y" && Number.isInteger(val) && val >= 1) {
    year = val;
  } else {
    throw new Error("入力された値は無効です");
  }
}

const dayFirst = new Date(year, month - 1, 1);
const dayLast = new Date(year, month, 0);

// ヘッダーをカレンダー幅（20文字）の中央に配置
const header = `${monthNames[month]} ${year}`;
const leftPadding = Math.max(0, Math.floor((20 - header.length) / 2));
console.log(" ".repeat(leftPadding) + header);
console.log("Su Mo Tu We Th Fr Sa");

process.stdout.write("   ".repeat(dayFirst.getDay()));

for (let i = 1; i <= dayLast.getDate(); i++) {
  process.stdout.write(String(i).padStart(2) + " ");

  if ((dayFirst.getDay() + i) % 7 === 0) {
    process.stdout.write("\n");
  }
}

// 最終日が土曜日でない場合のみ改行を追加
if ((dayFirst.getDay() + dayLast.getDate()) % 7 !== 0) {
  console.log();
}
