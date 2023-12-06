$(document).ready(function() { 
    const table1 = document.getElementById('assessmentTable1');
    const criteriaTable = document.getElementById('criteriaTable');
    const table2 = document.getElementById('assessmentTable2');
    const table3 = document.getElementById('bothTable');
    const qualityTable = document.getElementById('qualityTable2');

    function onChangeCriteria()
    {
        for (let i = 3; i < criteriaTable.rows.length; ++i)
        {
            for (let j = 2; j < 6; ++j)
            {
                criteriaTable.rows[i].cells[j].firstChild.value = Math.floor(Math.random() * 10) + 1;
                calculateCriteria(i);
                criteriaTable.rows[i].cells[j].firstChild.addEventListener('change', function() {
                    calculateCriteria(i);
                    calculateBothTable();
                    calculateQualityTable();
                });
            }
        }
    }

    function calculateCriteria(i)
    {
        let sum = 0;
        for (let j = 2; j < 6; ++j)
        {
            sum += parseFloat(criteriaTable.rows[i].cells[j].firstChild.value);
        }
        let avg = (sum / 4).toFixed(2);
        criteriaTable.rows[i].cells[6].innerHTML = avg;
    }

    onChangeCriteria();

    function onChangeAssessment1()
    {
        for (let i = 1; i < table1.rows.length; ++i)
        {
            for (let j = 2; j < 6; ++j)
            {
                table1.rows[i].cells[j].firstChild.value = Math.floor(Math.random() * 10) + 1;
                calculateAssessment1(i);
                table1.rows[i].cells[j].firstChild.addEventListener('change', function() {
                    calculateAssessment1(i);
                    calculateBothTable();
                    calculateQualityTable();
                });
            }
        }
    }

    function calculateAssessment1(i)
    {
        let sum = 0;
        for (let j = 2; j < 6; ++j)
        {
            sum += parseFloat(table1.rows[i].cells[j].firstChild.value);
        }
        let avg = (sum / 4).toFixed(2);
        table1.rows[i].cells[6].innerHTML = avg;
    }

    function onChangeAssessment2()
    {
        for (let i = 1; i < table2.rows.length; ++i)
        {
            for (let j = 2; j < 22; ++j)
            {
                table2.rows[i].cells[j].firstChild.value = Math.floor(Math.random() * 10) + 1;
                calculateAssessment2(i);
                table2.rows[i].cells[j].firstChild.addEventListener('change', function() {
                    calculateAssessment2(i);
                });
            }
        }
    }

    function calculateAssessment2(i)
    {
        let sum = 0;
        for (let j = 2; j < 22; ++j)
        {
            sum += parseFloat(table2.rows[i].cells[j].firstChild.value);
        }
        let avg = (sum / 20).toFixed(2);
        table2.rows[i].cells[22].innerHTML = avg;
        table1.rows[i].cells[5].firstChild.value = avg;
        calculateAssessment1(i);
        calculateBothTable();
        calculateQualityTable();
    }

    function calculateBothTable()
    {
        for (let i = 3; i < table3.rows.length - 1; ++i)
        {
            for (let j = 2; j < 6; ++j)
            {
                table3.rows[i].cells[j].innerHTML = criteriaTable.rows[i].cells[j].firstChild.value + " / " + table1.rows[i - 2].cells[j].firstChild.value;
            }
            table3.rows[i].cells[6].innerHTML = criteriaTable.rows[i].cells[6].innerHTML + " / " + table1.rows[i - 2].cells[6].innerHTML;
        }

        for (let j = 2; j < 6; ++j)
        {
            let sum1 = 0;
            let sum2 = 0;
            for (let i = 3; i < table3.rows.length - 1; ++i)
            {
                sum1 += parseFloat(criteriaTable.rows[i].cells[j].firstChild.value);
                sum2 += parseFloat(table1.rows[i - 2].cells[j].firstChild.value);
            }
            table3.rows[13].cells[j].innerHTML = (sum1 / 10).toFixed(2) + " / " + (sum2 / 10).toFixed(2);
        }

        let avg1 = 0;
        let avg2 = 0;
        for (let i = 3; i < table3.rows.length - 1; ++i)
        {
            avg1 += parseFloat(criteriaTable.rows[i].cells[6].innerHTML);
            avg2 += parseFloat(table1.rows[i - 2].cells[6].innerHTML);
        }
        table3.rows[13].cells[6].innerHTML = (avg1 / 10).toFixed(2) + " / " + (avg2 / 10).toFixed(2);
    }

    function calculateQualityTable()
    {
        for (let i = 3; i < qualityTable.rows.length - 2; ++i)
        {
            let sumproduct = 0;
            for (let j = 2; j < 6; ++j)
            {
                let product = parseFloat(criteriaTable.rows[i].cells[j].firstChild.value) * parseFloat(table1.rows[i - 2].cells[j].firstChild.value);
                qualityTable.rows[i].cells[j].innerHTML = product.toFixed(2);
                sumproduct += parseFloat(qualityTable.rows[i].cells[j].innerHTML) * parseFloat(qualityTable.rows[2].cells[j].innerHTML);
            }
            qualityTable.rows[i].cells[6].innerHTML = (sumproduct / 2.9).toFixed(2);
        }
        
        let wholeCriteriaSum = 0;
        let ozSum = 0;
        let lastRowSum = 0;
        for (let j = 2; j < 6; ++j)
        {
            let sum = 0;
            let criteriaSum = 0;
            for (let i = 3; i < qualityTable.rows.length - 2; ++i)
            {
                sum += parseFloat(qualityTable.rows[i].cells[j].innerHTML);
                criteriaSum += parseFloat(criteriaTable.rows[i].cells[j].firstChild.value);
            }
            wholeCriteriaSum += criteriaSum;
            qualityTable.rows[13].cells[j].innerHTML = (sum / criteriaSum).toFixed(2);
            ozSum += parseFloat(qualityTable.rows[13].cells[j].innerHTML);
            qualityTable.rows[14].cells[j].innerHTML = (parseFloat(qualityTable.rows[13].cells[j].innerHTML) * parseFloat(qualityTable.rows[2].cells[j].innerHTML)).toFixed(2);
            lastRowSum += parseFloat(qualityTable.rows[14].cells[j].innerHTML);
        }
        let criteriaAvg = wholeCriteriaSum / 40;

        let pokazSum = 0;
        let lastColSum = 0;
        for (let i = 3; i < qualityTable.rows.length - 2; ++i)
        {
            pokazSum += parseFloat(qualityTable.rows[i].cells[6].innerHTML);
            let lastCol = parseFloat(qualityTable.rows[i].cells[6].innerHTML) / parseFloat(criteriaTable.rows[i].cells[6].innerHTML);
            qualityTable.rows[i].cells[7].innerHTML = lastCol.toFixed(2);
            lastColSum += parseFloat(qualityTable.rows[i].cells[7].innerHTML);
        }
        let avg = pokazSum / 10;
        qualityTable.rows[13].cells[6].innerHTML = (avg / criteriaAvg).toFixed(2);
        qualityTable.rows[14].cells[6].innerHTML = (ozSum / 4).toFixed(2);
        qualityTable.rows[13].cells[7].innerHTML = (lastColSum / 10).toFixed(2);
        qualityTable.rows[14].cells[7].innerHTML = (lastRowSum / 2.9).toFixed(2);
    }

    onChangeAssessment1();
    onChangeAssessment2();
    calculateBothTable();
    calculateQualityTable();
});