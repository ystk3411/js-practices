const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;

// コマンドライン引数の解析（-m と -y の順不同・片方のみ指定に対応）
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  const option = args[i];
  const parsedValue = Number(args[i + 1]);

  if (option === "-m" && Number.isInteger(parsedValue) && parsedValue >= 1 && parsedValue <= 12) {
    month = parsedValue;
  } else if (option === "-y" && Number.isInteger(parsedValue) && parsedValue >= 1) {
    year = parsedValue;
  } else {
    throw new Error("入力された値は無効です");
  }
}

// ヘッダーをカレンダー幅（20文字）の中央に配置
const firstDay = new Date(year, month - 1, 1);
const monthName = firstDay.toLocaleString('en-US', { month: 'long' });
const header = `${monthName} ${year}`;
const leftPadding = Math.max(0, Math.floor((20 - header.length) / 2));
console.log(" ".repeat(leftPadding) + header);
console.log("Su Mo Tu We Th Fr Sa");

process.stdout.write("   ".repeat(firstDay.getDay()));

const lastDay = new Date(year, month, 0);

for (let i = 1; i <= lastDay.getDate(); i++) {
  process.stdout.write(String(i).padStart(2) + " ");

  if ((firstDay.getDay() + i) % 7 === 0) {
    process.stdout.write("\n");
  }
}

// 最終日が土曜日でない場合のみ改行を追加
if ((firstDay.getDay() + lastDay.getDate()) % 7 !== 0) {
  console.log();
}
