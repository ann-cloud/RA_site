$(document).ready(function() {
    const criteriaTable = document.getElementById('criteriaTable');
    const diagramTable1 = document.getElementById('diagramTable1');
    const diagramTable2 = document.getElementById('diagramTable2');
    const diagramTable3 = document.getElementById('diagramTable3');
    const diagramTable4 = document.getElementById('diagramTable4');
    const diagramTable6 = document.getElementById('diagramTable6');
    const qualityTable1 = document.getElementById('qualityTable1');
    const assesmentTable1 = document.getElementById('assessmentTable1');

    function setcanvas_settings(canvas){
        const diameter = 400;
        canvas.width = diameter + 32;
        canvas.height = diameter + 32;
    }    

    function drawEmptyDiagram(ctx, diameter, center, scale, maxRadius) {
        ctx.strokeStyle = '#32936F';
        ctx.lineWidth = 1;
    
        for (let i = 0; i <= maxRadius; i += scale) {
            const scaledRadius = i * center / maxRadius;
            ctx.beginPath();
            ctx.arc(center, center, scaledRadius, 0, 2 * Math.PI);
            ctx.stroke();
    
            // Підписи
            ctx.font = "10px Arial";
            ctx.fillText(i, center + 5, center - scaledRadius - 5);
        }
    
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(center, 0);
        ctx.lineTo(center, diameter);
        ctx.moveTo(0, center);
        ctx.lineTo(diameter, center);
        ctx.stroke();
    
        const arrowLength = 15;
        const arrowWidth = 10;
    
        ctx.beginPath();
        ctx.moveTo(diameter, center);
        ctx.lineTo(diameter - arrowLength, center - arrowWidth / 2);
        ctx.moveTo(diameter, center);
        ctx.lineTo(diameter - arrowLength, center + arrowWidth / 2);
        ctx.moveTo(center, 0);
        ctx.lineTo(center - arrowWidth / 2, arrowLength);
        ctx.moveTo(center, 0);
        ctx.lineTo(center + arrowWidth / 2, arrowLength);
        ctx.stroke();
    
        ctx.font = "15px Arial";
        ctx.fillText("X", diameter - 25, center + 20);
        ctx.fillText("Y", center - 20, 20);
    }
    
    
    function drawVectorsOnDiagram(ctx, center, maxRadius, arrayMainRadii, arrayMainAngles, arrayExtraAnglesInDegrees, color, needDrawOddVectors = true) {
    
        const mainRadii = arrayMainRadii.map(r => r * center / maxRadius);
        const mainAngles = arrayMainAngles.map(a => a * (Math.PI / 180));
    
        const extraRadii = Array(10).fill(100).map(r => r * center / maxRadius);
        const extraAngles = arrayExtraAnglesInDegrees.map(a => a * (Math.PI / 180));
    
        ctx.fillStyle = color; 
        ctx.beginPath();
        ctx.moveTo(center + mainRadii[0] * Math.cos(-mainAngles[0]), center + mainRadii[0] * Math.sin(-mainAngles[0]));
    
        for (let i = 1; i < 10; i++) {
            ctx.lineTo(center + mainRadii[i] * Math.cos(-mainAngles[i]), center + mainRadii[i] * Math.sin(-mainAngles[i]));
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'black'; 
        ctx.stroke();
    
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
    
        for (let i = 0; i < mainRadii.length; i++) {
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.lineTo(center + mainRadii[i] * Math.cos(-mainAngles[i]), center + mainRadii[i] * Math.sin(-mainAngles[i]));
            ctx.stroke();
    
            drawArrow(ctx, center + mainRadii[i] * Math.cos(-mainAngles[i]), center + mainRadii[i] * Math.sin(-mainAngles[i]), mainAngles[i]);
    
            if (needDrawOddVectors){
                ctx.font = "13px Arial";
                ctx.fillStyle = 'black';
                ctx.fillText(i + 1, center + mainRadii[i] * Math.cos(-mainAngles[i]) - 10, center + mainRadii[i] * Math.sin(-mainAngles[i]) - 10);
            }
        }
    
        if (needDrawOddVectors){
            ctx.strokeStyle = 'black'; 
            ctx.fillStyle = 'black'; 
            for (let i = 0; i < extraRadii.length; i++) {
                ctx.beginPath();
                ctx.moveTo(center, center);
                ctx.lineTo(center + extraRadii[i] * Math.cos(-extraAngles[i]), center + extraRadii[i] * Math.sin(-extraAngles[i]));
                ctx.stroke();
        
                ctx.font = "13px Arial";
                ctx.fillText(arrayExtraAnglesInDegrees[i] + "°", center + extraRadii[i] * Math.cos(-extraAngles[i]) - 0, center + extraRadii[i] * Math.sin(-extraAngles[i]) + 15);
            }
        }
    }
    
    
    function drawArrow(ctx, x, y, angle) {
      const len = 10; // Довжина стрілочки
    
      ctx.beginPath();
      ctx.moveTo(x, y); 
      ctx.lineTo(x - len * Math.cos(angle + Math.PI / 4), y + len * Math.sin(angle + Math.PI / 4));
      ctx.moveTo(x, y);
      ctx.lineTo(x - len * Math.cos(angle - Math.PI / 4), y + len * Math.sin(angle - Math.PI / 4));
      ctx.stroke();
    }
    
    function createDiagram1(table, ctx, color='rgba(255, 255, 0, 0.15)', needClear = true, needDrawOddVectors = true) {        
        const arrayMainRadii = [];
        const arrayMainAngles = [];
        const arrayExtraAnglesInDegrees = [];
        
        for (let i = 1; i < 10; i++) {
            arrayMainRadii.push(parseFloat(table.rows[i].cells[7].textContent));          
            arrayMainAngles.push(parseFloat(table.rows[i].cells[5].textContent));        
            arrayExtraAnglesInDegrees.push(parseFloat(table.rows[i].cells[4].textContent)); 
        }
        
        const scale = 10;
    
        const maxRadius = 100;
    
        const diameter = 400
        const center = diameter / 2 ;
    
        if (needClear){
            drawEmptyDiagram(ctx, diameter, center, scale, maxRadius);
        }
        drawVectorsOnDiagram(ctx, center, maxRadius, arrayMainRadii, arrayMainAngles, arrayExtraAnglesInDegrees, color, needDrawOddVectors);
    }


    function fillDiagramTable(table, criteriaIndex, color, canvasID, needClear = true)
    {
        //filling expert column
        let sum = 0;
        for (let i = 3; i < criteriaTable.rows.length; ++i)
        {
            if (table.id === "diagramTable6")
            {
                sum += parseFloat(criteriaTable.rows[i].cells[criteriaIndex].innerHTML)
                table.rows[i - 2].cells[2].innerHTML = criteriaTable.rows[i].cells[criteriaIndex].innerHTML;
            }
            else
            {
                sum += parseFloat(criteriaTable.rows[i].cells[criteriaIndex].firstChild.value)
                table.rows[i - 2].cells[2].innerHTML = criteriaTable.rows[i].cells[criteriaIndex].firstChild.value;
            }
        }

        //filling chastkaKruha column
        for (let i = 1; i < table.rows.length; ++i)
        {
            let chastkaKruha = 360 * parseFloat(table.rows[i].cells[2].innerHTML) / sum;
            table.rows[i].cells[3].innerHTML = chastkaKruha.toFixed(2);
        }

        //filling alpha column
        table.rows[1].cells[4].innerHTML = (parseFloat(table.rows[1].cells[3].innerHTML) / 2).toFixed(2);

        for (let i = 2; i < table.rows.length; ++i)
        {
            let alpha = parseFloat(table.rows[i].cells[3].innerHTML) + parseFloat(table.rows[i - 1].cells[4].innerHTML)
            table.rows[i].cells[4].innerHTML = alpha.toFixed(2);
        }

        //filling beta grad column
        table.rows[1].cells[5].innerHTML = (0).toFixed(2);

        for (let i = 2; i < table.rows.length; ++i)
        {
            let beta = (parseFloat(table.rows[i].cells[4].innerHTML) + parseFloat(table.rows[i - 1].cells[4].innerHTML)) / 2;
            table.rows[i].cells[5].innerHTML = beta.toFixed(2);
        }

        //filling beta rad column
        for (let i = 1; i < table.rows.length; ++i)
        {
            let betaRad = parseFloat(table.rows[i].cells[5].innerHTML) * Math.PI / 180;
            table.rows[i].cells[6].innerHTML = betaRad.toFixed(2);
        }

        //filling vector length column
        for (let i = 1; i < table.rows.length; ++i)
        {
            let vectorLength;
            if (table.id === "diagramTable6")
            {
                vectorLength = 0;
                for (let j = 2; j < 6; ++j)
                {
                    vectorLength += parseFloat(qualityTable1.rows[j - 1].cells[2].innerHTML) * parseFloat(criteriaTable.rows[i + 2].cells[j].firstChild.value) * parseFloat(assesmentTable1.rows[i].cells[j].firstChild.value);
                }
                vectorLength /= 2.9;
            }
            else
            {
                vectorLength = parseFloat(table.rows[i].cells[2].innerHTML) * parseFloat(qualityTable1.rows[criteriaIndex - 1].cells[2].innerHTML) * parseFloat(assesmentTable1.rows[i].cells[criteriaIndex].firstChild.value);
            }
            table.rows[i].cells[7].innerHTML = vectorLength.toFixed(2);
        }

        //filling a column
        for (let i = 1; i < table.rows.length; ++i)
        {
            let a = parseFloat(table.rows[i].cells[7].innerHTML) * Math.sin(parseFloat(table.rows[i].cells[6].innerHTML));
            table.rows[i].cells[8].innerHTML = a.toFixed(2);
        }

        //filling b column
        for (let i = 1; i < table.rows.length; ++i)
        {
            let b = parseFloat(table.rows[i].cells[7].innerHTML) * Math.cos(parseFloat(table.rows[i].cells[6].innerHTML));
            table.rows[i].cells[9].innerHTML = b.toFixed(2);
        }

        //filling s column
        for (let i = 1; i < table.rows.length; ++i)
        {
            let s1, s2;
            if (i == table.rows.length - 1)
            {
                s1 = parseFloat(table.rows[i].cells[8].innerHTML) * parseFloat(table.rows[1].cells[9].innerHTML);
                s2 = parseFloat(table.rows[1].cells[8].innerHTML) * parseFloat(table.rows[i].cells[9].innerHTML);
            }
            else
            {
                s1 = parseFloat(table.rows[i].cells[8].innerHTML) * parseFloat(table.rows[i + 1].cells[9].innerHTML);
                s2 = parseFloat(table.rows[i + 1].cells[8].innerHTML) * parseFloat(table.rows[i].cells[9].innerHTML);
            }
            table.rows[i].cells[10].innerHTML = (Math.abs(s1 - s2)).toFixed(2);
        }

        const canvas = document.getElementById(canvasID);
        setcanvas_settings(canvas)
        const ctx = canvas.getContext("2d");
    
        createDiagram1(table, ctx, color, needClear);
    }

    function fillDiagramTables()
    {
        fillDiagramTable(diagramTable1, 2, '#EFE6DD', "diagram1");
        fillDiagramTable(diagramTable2, 3, '#EFE6DD', "diagram2");
        fillDiagramTable(diagramTable3, 4, '#EFE6DD', "diagram3");
        fillDiagramTable(diagramTable4, 5, '#EFE6DD', "diagram4");
        fillDiagramTable(diagramTable6, 6, '#EFE6DD', "diagram6");

        const canvas = document.getElementById("diagram5")
        setcanvas_settings(canvas)
        const ctx = canvas.getContext("2d");

        createDiagram1(diagramTable1, ctx, '#151E3F', true, false);
        createDiagram1(diagramTable2, ctx, '#E4572E', false, false);
        createDiagram1(diagramTable3, ctx, '#F0F66E', false, false);
        createDiagram1(diagramTable4, ctx, '#F0F8EA', false, false);
    }

    fillDiagramTables();

    for (let i = 3; i < criteriaTable.rows.length; ++i)
    {
        for (let j = 2; j < 6; ++j)
        {
            criteriaTable.rows[i].cells[j].firstChild.addEventListener('change', function() {
                fillDiagramTables();
            });
        }
    }


    for (let i = 1; i < assesmentTable1.rows.length; ++i)
    {
        for (let j = 2; j < 6; ++j)
        {
            assesmentTable1.rows[i].cells[j].firstChild.addEventListener('change', function() {
                fillDiagramTables();
            });
        }
    }


});