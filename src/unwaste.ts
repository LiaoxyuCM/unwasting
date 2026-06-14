export default function unwaste_compile(str: string, uniqueResult: boolean = true) {
  let chars: number[] = [];
  let cells: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let cells_used: boolean[] = [true, false, false, false, false, false, false, false, false, false];
  let result = '';
  if (uniqueResult) { result += '0#' };
  str.split('').forEach((chr) => {
    chars.push(chr.charCodeAt(0));
  });
  let lastMostCloseIndex: number = 0;
  let mostCloseIdxType: string = '.';

  chars.forEach((num) => {
    // find the most close number in these cells
    let cellIndex: number = 0;
    let mostClose: number = Number.MAX_VALUE;
    let mostCloseIndex: number = 0;
    cells.forEach((cellnum) => {
      if (Math.abs(cellnum - num) < Math.abs(mostClose)) {
        mostClose = cellnum - num;
        mostCloseIndex = cellIndex;
        mostCloseIdxType = '.';
      }
      if (!isNaN(parseInt(String.fromCharCode(num)))) {
        const charnum = parseInt(String.fromCharCode(num));
        if (Math.abs(cellnum - charnum) < Math.abs(mostClose)) {
          mostClose = cellnum - charnum;
          mostCloseIndex = cellIndex;
          mostCloseIdxType = '%';
        }
      }
      cellIndex += 1;
    });

    if (lastMostCloseIndex != mostCloseIndex) {
      result += String(mostCloseIndex);
      if (uniqueResult && (!cells_used[mostCloseIndex])) {
        cells_used[mostCloseIndex] = true;
        result += "#";
      }
    };
    lastMostCloseIndex = mostCloseIndex;

    const opr: string = mostClose > 0 ? '-' : '+';
    let numa: number = Math.abs(mostClose);

    if (numa >= 2 && numa <= 5) {
      result += opr.repeat(numa);
    } else {
      let snuma: string[] = numa.toString(2).split('')
      result += '['.repeat(snuma.length - 1);
      let last: string | undefined = snuma.pop();

      snuma.forEach((car) => {
        if (car == '1') {
          result += opr + ']';
        } else {
          result += ']';
        }
      });
      if (last == '1') {
        result += opr;
      }
    }

    cells[mostCloseIndex] = mostCloseIdxType == '.' ? num : parseInt(String.fromCharCode(num));
    result += mostCloseIdxType;
  })
  return result;
}
