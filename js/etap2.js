$(document).ready(function() { 
    const table21 = document.getElementById('inputTable21');
    const table22 = document.getElementById('inputTable22');
    const resultTable2 = document.getElementById('resultTableEtap2');
    var max, min, mpr, limit1, limit2;

    function onChangeEtap22()
    {
        for (let i = 1; i < table22.rows.length; ++i)
        {
            table22.rows[i].cells[3].firstChild.value = Math.random().toFixed(2);
            calculateEtap22(i);
            pastePriority()
            table22.rows[i].cells[3].firstChild.addEventListener('change', function() {
                calculateEtap22(i);
                pastePriority()
            });
        }
    }

    function onChangeEtap21()
    {
        for (let i = 1; i < table21.rows.length; ++i)
        {
            for (let j = 2; j < 12; ++j)
            {
                table21.rows[i].cells[j].firstChild.value = Math.random().toFixed(2);
                calculateEtap21(i);
                calculateEtap22(i);
                pastePriority();
                table21.rows[i].cells[j].firstChild.addEventListener('change', function() {
                    calculateEtap21(i);
                    calculateEtap22(i);
                    pastePriority();
                });
            }
        }
    }

    function calculateEtap21(i)
    {
        let sum = 0;
        for (let j = 2; j < 12; ++j)
        {
            sum += parseFloat(table21.rows[i].cells[j].firstChild.value);
        }
        let er = (sum / 10).toFixed(2);
        table21.rows[i].cells[12].innerHTML = er;
        table22.rows[i].cells[2].innerHTML = er;
    }

    function calculateEtap22(i)
    {
        let product = parseFloat(table22.rows[i].cells[2].innerHTML) * parseFloat(table22.rows[i].cells[3].firstChild.value);
        table22.rows[i].cells[4].innerHTML = product.toFixed(2);
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
        let max = parseFloat(table22.rows[1].cells[4].innerHTML);
        for (let i = 2; i < table22.rows.length; ++i)
        {
            let num = parseFloat(table22.rows[i].cells[4].innerHTML);
            if (num > max)
            {
                max = num;
            }
        }
        return max;
    }

    function minVRER()
    {
        let min = parseFloat(table22.rows[1].cells[4].innerHTML);
        for (let i = 2; i < table22.rows.length; ++i)
        {
            let num = parseFloat(table22.rows[i].cells[4].innerHTML);
            if (num < min)
            {
                min = num;
            }
        }
        return min;
    }

    function pastePriority()
    {
        for (let i = 1; i < table22.rows.length; ++i)
        {
            let vrer = parseFloat(table22.rows[i].cells[4].innerHTML);

            if (vrer >= min && vrer < limit1)
            {
                table22.rows[i].cells[5].innerHTML = 'Низький';
                table22.rows[i].cells[5].style.backgroundColor = "rgb(156, 251, 115)";
            } else if (vrer >= limit1 && vrer < limit2)
            {
                table22.rows[i].cells[5].innerHTML = 'Середній';
                table22.rows[i].cells[5].style.backgroundColor = "rgb(255, 255, 110)";
            }
            else if (vrer >= limit2 && vrer <= max)
            {
                table22.rows[i].cells[5].innerHTML = 'Високий';
                table22.rows[i].cells[5].style.backgroundColor = "rgb(255, 93, 93)";
            }
        }
    }

    onChangeEtap21();
    onChangeEtap22();
});