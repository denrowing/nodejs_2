function compareFirstName(word1, word2) {
    let totalError = 0;

    if ((word1.length - word2.length) >= 3 || (word1.length - word2.length) <= -3) {
        totalError = false;
        return totalError;
    } else if (word1.length === word2.length) {
        for (let i = 0; i < word1.length; i++) {
            if(word1.charAt(i) !== word2.charAt(i)) {
                totalError++;
            }
        }
    } else if ((word1.length > word2.length)) {
        for (let i = 0; i < word1.length; i++) {
            if(word1.charAt(i) !== word2.charAt(i) ) {
                totalError++;
            }
        }
    } else if ((word1.length < word2.length)) {
        for (let i = 0; i < word2.length; i++) {
            if(word2.charAt(i) !== word1.charAt(i) ) {
                totalError++;
            }
        }
    }
    return totalErr(totalError);

};

function totalErr(TE) {
    if (TE >= 3 ) {
        return false;
    };
    return true;
}

compareFirstName('Kostya', 'Kostin');
