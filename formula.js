function loadFormulaPage() {
    const content = document.getElementById('contentWindow');
    if(!content) return;

    content.innerHTML = `
        <div class="formula-card">
             <h2>Формула энергии студента на день</h2>
        <p class="formula-description">
            Эта формула вычисляет "энергию" студента по показателям мотивации, учёбы, кофе, друзей, отдыха и проблем.
        </p>
        <div class="formula-inputs">
            <label>Мотивация: <input type="number" id="motivation" value="0"></label>
            <label>Учёба: <input type="number" id="study" value="0"></label>
            <label>Энергия(кофе): <input type="number" id="coffee" value="0"></label>
            <label>Друзья: <input type="number" id="friends" value="0"></label>
            <label>Отдых: <input type="number" id="rest" value="0"></label>
            <label>Проблемы: <input type="number" id="problems" value="0"></label>
            <label>Случайное число min: <input type="number" id="randMin" value="1"></label>
            <label>Случайное число max: <input type="number" id="randMax" value="10"></label>
            <button onclick="calculateFormula()">Рассчитать</button>
        </div>
        <p class="formula-text">Формула:<br>
            <code>√MAX(0, Мотивация*5 + Учёба*8 + IF(Энергия(кофе)>0,10,0) + Друзья*3 + Отдых*2 - MAX(0, Отдых-(Мотивация+Проблемы)/2)*4 + Случайное число)</code>
        </p>
        <div class="formula-explanation">
            <p><strong>Пояснение:</strong></p>
            <ul>
                <li><strong>Мотивация:</strong> насколько вы мотивированы учиться (коэффициент 5)</li>
                <li><strong>Учёба:</strong> сколько времени уделяете занятиям (коэффициент 8)</li>
                <li><strong>Энергия(кофе):</strong> если кофе > 0, добавляем 10 единиц энергии</li>
                <li><strong>Друзья:</strong> социальная активность (коэффициент 3)</li>
                <li><strong>Отдых:</strong> отдых и восстановление (коэффициент 2)</li>
                <li><strong>Проблемы:</strong> сложные ситуации, которые снижают энергию</li>
                <li><strong>Случайное число:</strong> небольшой элемент случайности (от min до max)</li>
            </ul>
        </div>
        <p class="formula-result">Результат: <span id="result">0</span></p>
    </div>
    `;
}

function calculateFormula() {
    const motivation = parseFloat(document.getElementById('motivation').value) || 0;
    const study = parseFloat(document.getElementById('study').value) || 0;
    const coffee = parseFloat(document.getElementById('coffee').value) || 0;
    const friends = parseFloat(document.getElementById('friends').value) || 0;
    const rest = parseFloat(document.getElementById('rest').value) || 0;
    const problems = parseFloat(document.getElementById('problems').value) || 0;
    const randMin = parseFloat(document.getElementById('randMin').value) || 0;
    const randMax = parseFloat(document.getElementById('randMax').value) || 0;

    const randomValue = Math.floor(Math.random() * (randMax - randMin + 1)) + randMin;

    const result = Math.sqrt(Math.max(0, 
        motivation*5 + study*8 + (coffee>0 ? 10 : 0) + friends*3 + rest*2 - Math.max(0, rest - (motivation + problems)/2)*4 + randomValue
    ));

    document.getElementById('result').textContent = result.toFixed(2);
}

