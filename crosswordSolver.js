function CheckWords(word){
    const regex=/[^a-z]/gi
    
    if(!Array.isArray(word)||word.length==0){
        return true 
    }
    for(let i=0;i<word.length;i++){
        if(word[i].length<2||typeof word[i]!="string"){
            console.log(word[i]);     
            return true
        }

        for(let k=i+1;k<word[i].length;k++){
            if(word[k]==word[i]){
                return true 
            }
        }
        
        for(let j=0;j<word[i].length;j++){
            console.log("jj");
            
            
            console.log(word[i][j]);
            if(word[i][j].match(regex)!=null){
                return true
            }
        }

    }
    return false 
}

function CheckPuzzel(puzzl){
    const regex=/[^0-2|.]/g
    if(typeof puzzl!="string"){
        return true 
    }
    let res = puzzl.split("\n").join("")
    
    //console.log(res);
    
    //console.log();
    if(res.match(regex)!=null)
    {
        return true

    }
    return false
}

function crosswordSolver(puzzleMap,words){
    let error =false
    error = CheckWords(words)
    error = CheckPuzzel(puzzleMap)
    if(error){
        return console.log("Error");
        
    }else{
        return console.log("succ");
    }
}

// const emptyPuzzle=14

const emptyPuzzle = `2001
0..0
1000
0..0`
const words = ['\n',"\n", 'alan', 'ciao',"anta"]
//const words=["","hhh"]
crosswordSolver(emptyPuzzle, words)

/* output:
`casa
i..l
anta
*/