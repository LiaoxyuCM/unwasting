export default function unwaste_compile(str: string, uniqueResult: boolean = true): string {
  let chars: number[] = [];
  let cells: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let cells_used: boolean[] = [true, false, false, false, false, false, false, false, false, false];
  let result = "";
  if (uniqueResult) { result += "0#" }
  str.split("").forEach((chr) => {
    chars.push(chr.charCodeAt(0));
  });
  let lastMostCloseIndex: number = 0;
  let snippet: string = "";
  let lastSnippet: string = "";
  let snippetCnt: number = 1;
  let mostCloseIdxType: string = ".";

  function handleSnippet() {
    if (result.endsWith(lastSnippet)) {
      result = result.slice(0, -lastSnippet.length);
      snippetCnt += 1;
    }

    let binSnippetCnt: string[] = snippetCnt.toString(2).split("");
    let last: string | undefined = binSnippetCnt.pop();
    result += "[".repeat(binSnippetCnt.length);

    binSnippetCnt.forEach((car) => {
      if (car == "1") {
        result += lastSnippet + "]";
      } else {
        result += "]";
      }
    });
    if (last == "1") {
      result += lastSnippet;
    }
  }

  chars.forEach((num) => {
    if (num == 10) {
      result += ":";
      return;
    }

    // find the most close number in these cells
    let cellIndex: number = 0;
    let mostClose: number = Number.MAX_VALUE;
    let mostCloseIndex: number = 0;
    cells.forEach((cellnum) => {
      if (Math.abs(cellnum - num) < Math.abs(mostClose)) {
        mostClose = cellnum - num;
        mostCloseIndex = cellIndex;
        mostCloseIdxType = ".";
      }
      if (!isNaN(parseInt(String.fromCharCode(num)))) {
        const charnum = parseInt(String.fromCharCode(num));
        if (Math.abs(cellnum - charnum) < Math.abs(mostClose)) {
          mostClose = cellnum - charnum;
          mostCloseIndex = cellIndex;
          mostCloseIdxType = "%";
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
    }
    lastMostCloseIndex = mostCloseIndex;

    const opr: string = mostClose > 0 ? "-" : "+";
    let numa: number = Math.abs(mostClose);

    snippet = "";

    if (numa <= 7) {
      snippet += opr.repeat(numa);
    } else {
      let snuma: string[] = numa.toString(2).split("")
      let last: string | undefined = snuma.pop();
      snippet += "[".repeat(snuma.length);

      snuma.forEach((car) => {
        if (car == "1") {
          snippet += opr + "]";
        } else {
          snippet += "]";
        }
      });
      if (last == "1") {
        snippet += opr;
      }
    }

    cells[mostCloseIndex] = mostCloseIdxType == "." ? num : parseInt(String.fromCharCode(num));
    snippet += mostCloseIdxType;

    if (snippet == lastSnippet) {
      snippetCnt += 1;
    } else {
      if (lastSnippet != "") {
        if (lastSnippet.length == 1 && snippetCnt <= 7) {
          result += lastSnippet.repeat(snippetCnt);
        } else {
          handleSnippet();
        }
      }
      snippetCnt = 1;
      lastSnippet = snippet;
    }
  })
  handleSnippet();
  return result;
}
