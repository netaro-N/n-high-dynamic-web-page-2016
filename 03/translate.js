(function(){
    'use strict';
    const languageInput = document.getElementById('language');
    const translateButton = document.getElementById('translate');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
　　

    /**
     *  指定した要素の子供をすべて削除する
     *  @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element) {
        while (element.firstChild) { // 子どもの要素があるかぎり削除
            element.removeChild(element.firstChild);
        }
    }

    translateButton.onclick = () => {
        const language = languageInput.value;
        if (language.length === 0) { // 言葉が空の時は処理を終了する
            return;
        }
        
        // 翻訳結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');        
        header.innerText = '翻訳結果';
        var deg = 0;
        function rotateHeader() {
           deg = deg + 6;
           deg = deg % 360;
           if ((0 <= deg && deg < 90) || (270 <= deg && deg < 360)) {
               header.className = 'face';
           } else {
               header.className = 'back';
           }
           header.style.transform = 'rotateX(' + deg + 'deg)';
        }
        setInterval(rotateHeader, 25);
        resultDivided.appendChild(header);
        

        
        
       

        const paragraph = document.createElement('p');
        const result = translate(language);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        const comment = document.createElement('p');
        comment.innerText = 'これであなたもネコと話せるかも！？';
        resultDivided.appendChild(comment);

        //ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%AD%E3%81%93%E3%81%BB%E3%82%93%E3%82%84%E3%81%8F&text=' 
            + encodeURIComponent(result);
        anchor.setAttribute('href',hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #%E3%81%AD%E3%81%93%E3%81%BB%E3%82%93%E3%82%84%E3%81%8F';
        tweetDivided.appendChild(anchor);
        twttr.widgets.load();
    };

    languageInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            translateButton.onclick();
        }
    };

    const answers = [
        '{language}は 「ニャ」 です',
        '{language}は 「ニャー」 です',
        '{language}は 「ニャン」 です',
        '{language}は 「ニャニャ」 です',
        '{language}は 「ニャニャー」 です',
        '{language}は 「ニャーニャ」 です',
        '{language}は 「ニャオ」 です',
        '{language}は 「ニャーオ」 です',
        '{language}は 「ニャーオー」 です',
        '{language}は 「ニャオニャー」 です',
        '{language}は 「ニャッニャオー」 です',
        '{language}は 「ウゥー」 です',
        '{language}は 「ウゥニャー」 です',
        '{language}は 「ウゥウゥー」 です',
        '{language}は 「ニャーオン」 です',
        '{language}は 「ニャーウゥー」 です',
        '{language}は 「ウニャ」 です',
        '{language}は 「グルゥグルゥ」 です',
        '{language}は 「ニャーン」 です',
        '{language}は 「グルゥニャーン」 です',
        '{language}は 「ニャオーニャ」 です',
        '{language}は 「ニャンウゥー」 です',
        '{language}は 「ニャンニャー」 です',
        '{language}は 「ンニャー」 です',
        '{language}は 「グルゥニャン」 です',
        '{language}は 「ニャオウゥー」 です',
        '{language}は 「ギニャー」 です',
        '{language}は 「ニャンギャー」 です',
        '{language}は 「ギニャーオ」 です',
        '{language}は 「ウゥニャーン」 です',
        '{language}は 「ニャオニャオ」 です',
        '{language}は 「ニャーニャッニャー」 です',
        '{language}は 「ウゥニャンニャー」 です',
        '{language}は 「ニャンニャン」 です',
        '{language}は 「ニャグルゥ」 です',
        '{language}は 「ニャーウゥニャー」 です',
    ];

    /**
     * 言葉の文字列を渡すと翻訳結果を返す関数
     * @param {string} language 入力した言葉
     * @returu {string} 翻訳結果
     */
    function translate(language){
        // 全文字コード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < language.length; i++) {
            sumOfcharCode = sumOfcharCode + language.charCodeAt(i);          
        }

        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length; 
        let result = answers[index];
        
        result = result.replace(/\{language}/g, language);
        return result;
    }

    // テストコード
    console.assert(
        translate('おはよう') === 'おはようは 「ニャーオ」 です',
        '翻訳結果の文言の特定の部分を言葉に置き換える処理が正しくありません。'
　　);

    console.assert(
        translate('おはよう') === translate('おはよう'),
        '入力が同じ言葉なら同じ翻訳結果を出力する処理が正しくありません。'
    );

})();