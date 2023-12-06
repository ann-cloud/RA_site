$(document).ready(function() {
    const resultTable1 = document.getElementById('resultTableEtap1');
    const table11 = document.getElementById('inputTable11');
    const table12 = document.getElementById('inputTable12');

    function calculateEtap1(table, i1, i2, i3, n)
    {
        for (let i = 1; i < table.rows.length; ++i)
        {
            table.rows[i].cells[2].firstChild.addEventListener('change', function() {
                let sums = [0, 0, 0, 0];
                for (let j = 1; j < n; ++j) {
                    let index;
                    if (j < i1) {
                        index = 0;
                    } else if (j < i2) {
                        index = 1;
                    } else if (j < i3) {
                        index = 2;
                    } else {
                        index = 3;
                    }
                    sums[index] += parseInt(table.rows[j].cells[2].firstChild.value);
                }
    
                let allSum = 0;
                for (let j = 0; j < 4; ++j)
                {
                    let risk = sums[j] * 100 / (n - 1);
                    allSum += risk;
                    resultTable1.rows[j].cells[1].innerHTML = risk.toFixed(2) + "%";
                }
                resultTable1.rows[4].cells[1].innerHTML = allSum.toFixed(2) + "%";
            });
        }
    }
    calculateEtap1(table11, 8, 11, 14, 19);
    calculateEtap1(table12, 12, 19, 28, 42);
});