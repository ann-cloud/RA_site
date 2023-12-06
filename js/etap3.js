$(document).ready(function() { 
    const table41 = document.getElementById('inputTable41');
    const table42 = document.getElementById('inputTable42');
    const resultTable2 = document.getElementById('resultTableEtap4');
    var max, min, mpr, limit1, limit2;

    function onChangeEtap42()
    {
        for (let i = 1; i < table42.rows.length; ++i)
        {
            table42.rows[i].cells[3].firstChild.value = Math.random().toFixed(2);
            calculateEtap42(i);
            pastePriority()
            table42.rows[i].cells[3].firstChild.addEventListener('change', function() {
                calculateEtap42(i);
                pastePriority()
            });
        }
    }

    function onChangeEtap41()
    {
        for (let i = 1; i < table41.rows.length; ++i)
        {
            for (let j = 2; j < 12; ++j)
            {
                table41.rows[i].cells[j].firstChild.value = Math.random().toFixed(2);
                calculateEtap41(i);
                calculateEtap42(i);
                pastePriority();
                table41.rows[i].cells[j].firstChild.addEventListener('change', function() {
                    calculateEtap41(i);
                    calculateEtap42(i);
                    pastePriority();
                });
            }
        }
    }

    function calculateEtap41(i)
    {
        let sum = 0;
        for (let j = 2; j < 12; ++j)
        {
            sum += parseFloat(table41.rows[i].cells[j].firstChild.value);
        }
        let er = (sum / 10).toFixed(2);
        table41.rows[i].cells[12].innerHTML = er;
        table42.rows[i].cells[2].innerHTML = er;
    }

    function calculateEtap42(i)
    {
        let product = parseFloat(table42.rows[i].cells[2].innerHTML) * parseFloat(table42.rows[i].cells[3].firstChild.value);
        table42.rows[i].cells[4].innerHTML = product.toFixed(2);
        min = minVRER();
        max = maxVRER();
        resultTable2.rows[0].cells[1].innerHTML = min;
        resultTable2.rows[1].cells[1].innerHTML = max;
        mpr = (max - min) / 3;
        limit1 = (min + mpr).toFixed(2);
        limit2 = (min + 2 * mpr).toFixed(2);
        resultTable2.rows[2].cells[1].innerHTML = '[' + min + '; ' + limit1 + ")";
        resultTable2.rows[3].cells[1].innerHTML = '[' + limit1 + '; ' + limit2 + ")";
        resultTable2.rows[4].cells[1].innerHTML = '[' + limit2 + '; ' + max + "]";
    }

    function maxVRER()
    {
        let max = parseFloat(table42.rows[1].cells[4].innerHTML);
        for (let i = 2; i < table42.rows.length; ++i)
        {
            let num = parseFloat(table42.rows[i].cells[4].innerHTML);
            if (num > max)
            {
                max = num;
            }
        }
        return max;
    }

    function minVRER()
    {
        let min = parseFloat(table42.rows[1].cells[4].innerHTML);
        for (let i = 2; i < table42.rows.length; ++i)
        {
            let num = parseFloat(table42.rows[i].cells[4].innerHTML);
            if (num < min)
            {
                min = num;
            }
        }
        return min;
    }

    function pastePriority()
    {
        for (let i = 1; i < table42.rows.length; ++i)
        {
            let vrer = parseFloat(table42.rows[i].cells[4].innerHTML);

            if (vrer >= min && vrer < limit1)
            {
                table42.rows[i].cells[5].innerHTML = 'Низький';
                table42.rows[i].cells[5].style.backgroundColor = "rgb(156, 251, 115)";
            } else if (vrer >= limit1 && vrer < limit2)
            {
                table42.rows[i].cells[5].innerHTML = 'Середній';
                table42.rows[i].cells[5].style.backgroundColor = "rgb(255, 255, 110)";
            }
            else if (vrer >= limit2 && vrer <= max)
            {
                table42.rows[i].cells[5].innerHTML = 'Високий';
                table42.rows[i].cells[5].style.backgroundColor = "rgb(255, 93, 93)";
            }
        }
    }

    onChangeEtap41();
    onChangeEtap42();
});