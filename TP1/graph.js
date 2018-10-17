//Data à afficher
var data = {
series : [
    {name: "Serie 1", values: [0.5, 0.3, 0.7, 0.2]},
    {name: "Serie 2", values: [0.4, 0.2, 0.9, 0.3]},
    {name: "Serie 3", values: [0.2, 0.1, 0.6, 0.4]},
    {name: "Serie 4", values: [0.9, 0.7, 0.5, 0.8]}
],
colonnes : ["Colonne 1", "Colonne 2", "Colonne 3", "Colonne 4"]
};

//Création de la zone du graph
var hauteur = 600;
var largeur = 1350;

var paper = Raphael("exemple",largeur,hauteur);
paper.rect(0,0,largeur,hauteur).attr({fill:"#EEEEEE"});

//Mise en forme
var nbColumns = data.colonnes.length;
var nbSeries = data.series.length;
var marge = 20;
var largGraph = largeur - 2*marge;
var hautMarge = hauteur - 2*marge;
var distColonnes = largGraph / nbColumns;

var xPos = [];
for(i=1; i<nbColumns; i++){
    xPos.push(distColonnes*i + marge);
}
    xPos.push(largGraph);
var yPos = [];
    yPos.push(marge, hautMarge)    
//Ajout des différents colonnes
for(i=0; i<nbColumns; i++){
    var ligne = paper.path("M"+xPos[i]+","+yPos[0]+"L"+xPos[i]+","+yPos[1]+"L"+xPos[i])
        ligne.attr({
            "stroke-width":"1px",
            "stroke":"black"
        });
        paper.text(xPos[i],yPos[1]+20, data.colonnes[i]).attr({fill: '#000000'});
}
//Choix des couleurs par le nombre de séries
var colors = [];
var saturation = 40;
var luminosity = 60;
for(i=0; i<nbSeries; i++){
    var x = 360/nbSeries;
    colors.push(x*(i+1));
}
//Création des chemins
var pathTab= [];
var labelLarg = 75;
var labelHaut = 20;
for(var j=0; j<nbSeries; j++){
    var chemin = `M${labelLarg},${data.series[j].values[0]*hautMarge}`;
    for(var i=0; i<nbColumns; i++){
        chemin += `L${xPos[i]},${data.series[j].values[i]*hautMarge}`;
    }
    var path = paper.path(chemin).attr({
        "stroke-width":"2px",
        "stroke": `${"hsl("+colors[j]+","+ saturation+","+ luminosity+")"}`
    });
    pathTab.push(path);
}
//Ajout des étiquette
var etiquetteTab = [];
var textEtiquetteTab = [];
for(i=0; i<nbSeries; i++){
    var etiquette = paper.rect(labelLarg,data.series[i].values[0]*hautMarge-marge/2,labelLarg,labelHaut).attr({
        fill:"hsl("+colors[i]+","+ saturation+","+ luminosity+")"
    }); 
    var textEtiquette = paper.text(labelLarg+2*marge,data.series[i].values[0]*hautMarge, data.series[i].name).attr({
        "font-size": 13, fill: '#FFFFFF'
    });
    etiquetteTab.push(etiquette);
    textEtiquetteTab.push(textEtiquette);
    console.log(etiquetteTab);
}
//Ajout des points du graph
//Cercles
var cercleTab = [];
var textCercleTab = [];
var cercleD = 15;
for(var j=0; j<nbSeries; j++){
    for(var i=0; i<nbColumns; i++){
        var cercle = paper.circle(xPos[i],data.series[j].values[i]*hautMarge,cercleD);
        cercle.attr({
            fill:"hsl("+colors[j]+","+ saturation+","+ luminosity+")"
        });
        cercleTab.push(cercle);
    }
}
//Textes
for(var j=0; j<nbSeries; j++){
    for(var i=0; i<nbColumns; i++){
        var cercle = paper.text(xPos[i],data.series[j].values[i]*hautMarge,data.series[j].values[i])
        cercle.attr({
            "font-size": 13, fill: '#FFFFFF'
        });
        textCercleTab.push(cercle);
    }
}
//Appel des fonctions d'animations
etiquetteTab[0].click(pathOnCLick1);
textEtiquetteTab[0].click(pathOnCLick1);
etiquetteTab[1].click(pathOnCLick2);
textEtiquetteTab[1].click(pathOnCLick2);
etiquetteTab[2].click(pathOnCLick3);
textEtiquetteTab[2].click(pathOnCLick3);
etiquetteTab[3].click(pathOnCLick4);
textEtiquetteTab[3].click(pathOnCLick4);
//Animation click sur Series n°1
var state = 0;
function pathOnCLick1() {
    if(state==1){
        pathTab[1].show();
        pathTab[2].show();
        pathTab[3].show();
        pathTab[0].animate({"stroke-width":"2px"}, "linear");

        for(i=4;i<cercleTab.length;i++){
            cercleTab[i].show();
            textCercleTab[i].show();
        }

        etiquetteTab[0].animate({
            "x":labelLarg,
            "y":(data.series[0].values[0]*hautMarge-marge/2),
            "width":labelLarg, 
            "height":labelHaut}, 500, "bounce");
        textEtiquetteTab[0].animate({"font-size":13}, 200, "easeIn");
        state = 0;
    }else{
        pathTab[0].show();
        pathTab[1].hide();
        pathTab[2].hide();
        pathTab[3].hide();
        pathTab[0].animate({"stroke-width":"5px"}, "linear");

        for(i=4;i<cercleTab.length;i++)[
            cercleTab[i].hide(),
            textCercleTab[i].hide()
        ]
        for(i=0;i<data.series.length;i++){
            if(i==0){
                etiquetteTab[0].animate({
                    "x":labelLarg-labelLarg*(3/20),
                    "y":(data.series[0].values[0]*hautMarge-marge/2)-3,
                    "width":labelLarg+labelLarg*(3/10), 
                    "height":labelHaut+labelHaut*(3/10)}, 500, "bounce");
                textEtiquetteTab[0].animate({"font-size":18}, 200, "easeIn");
            }else{
                etiquetteTab[i].animate({
                    "x":labelLarg,
                    "y":(data.series[i].values[0]*hautMarge-marge/2),
                    "width":labelLarg, 
                    "height":labelHaut}, 500, "bounce");
                textEtiquetteTab[i].animate({"font-size":13}, 200, "easeIn");
            }
        }
        state = 1;
    } 
}
//Animation click sur Series n°2
function pathOnCLick2() {
    if(state==1){
        pathTab[0].show();
        pathTab[2].show();
        pathTab[3].show();
        pathTab[1].animate({"stroke-width":"2px"}, "linear");

        for(i=0;i<cercleTab.length;i++){
            if(i<4 || i>7){
                cercleTab[i].show();
                textCercleTab[i].show();
            }
        }

        etiquetteTab[1].animate({
            "x":labelLarg,
            "y":(data.series[1].values[0]*hautMarge-marge/2),
            "width":labelLarg, 
            "height":labelHaut}, 500, "bounce");
        textEtiquetteTab[1].animate({"font-size":13}, 200, "easeIn");
        state = 0;
    }else{
        pathTab[1].show();
        pathTab[0].hide();
        pathTab[2].hide();
        pathTab[3].hide();
        pathTab[1].animate({"stroke-width":"5px"}, "linear");

        for(i=0;i<cercleTab.length;i++){
            if(i<4 || i>7){
                cercleTab[i].hide(),
                textCercleTab[i].hide()
            }
        }
        for(i=0;i<data.series.length;i++){
            if(i==1){
                etiquetteTab[1].animate({
                    "x":labelLarg-labelLarg*(3/20),
                    "y":(data.series[1].values[0]*hautMarge-marge/2)-3,
                    "width":labelLarg+labelLarg*(3/10), 
                    "height":labelHaut+labelHaut*(3/10)}, 500, "bounce");
                textEtiquetteTab[1].animate({"font-size":18}, 200, "easeIn");
            }else{
                etiquetteTab[i].animate({
                    "x":labelLarg,
                    "y":(data.series[i].values[0]*hautMarge-marge/2),
                    "width":labelLarg, 
                    "height":labelHaut}, 500, "bounce");
                textEtiquetteTab[i].animate({"font-size":13}, 200, "easeIn");
            }
        }
        state = 1;
    } 
}
//Animation click sur Series n°3
function pathOnCLick3() {
    if(state==1){
        pathTab[0].show();
        pathTab[1].show();
        pathTab[3].show();
        pathTab[2].animate({"stroke-width":"2px"}, "linear");

        for(i=0;i<cercleTab.length;i++){
            if(i<8 || i>11){
                cercleTab[i].show();
                textCercleTab[i].show();
            }
        }

        etiquetteTab[2].animate({
            "x":labelLarg,
            "y":(data.series[2].values[0]*hautMarge-marge/2),
            "width":labelLarg, 
            "height":labelHaut}, 500, "bounce");
        textEtiquetteTab[2].animate({"font-size":13}, 200, "easeIn");
        state = 0;
    }else{
        pathTab[2].show();
        pathTab[0].hide();
        pathTab[1].hide();
        pathTab[3].hide();
        pathTab[2].animate({"stroke-width":"5px"}, "linear");

        for(i=0;i<cercleTab.length;i++){
            if(i<8 || i>11){
                cercleTab[i].hide(),
                textCercleTab[i].hide()
            }
        }
        for(i=0;i<data.series.length;i++){
            if(i==2){
                etiquetteTab[2].animate({
                    "x":labelLarg-labelLarg*(3/20),
                    "y":(data.series[2].values[0]*hautMarge-marge/2)-3,
                    "width":labelLarg+labelLarg*(3/10), 
                    "height":labelHaut+labelHaut*(3/10)}, 500, "bounce");
                textEtiquetteTab[2].animate({"font-size":18}, 200, "easeIn");
            }else{
                etiquetteTab[i].animate({
                    "x":labelLarg,
                    "y":(data.series[i].values[0]*hautMarge-marge/2),
                    "width":labelLarg, 
                    "height":labelHaut}, 500, "bounce");
                textEtiquetteTab[i].animate({"font-size":13}, 200, "easeIn");
            }
        }
        state = 1;
    } 
}
//Animation click sur Series n°4
function pathOnCLick4() {
    if(state==1){
        pathTab[0].show();
        pathTab[1].show();
        pathTab[2].show();
        pathTab[3].animate({"stroke-width":"2px"}, "linear");

        for(i=0;i<cercleTab.length;i++){
            if(i<12){
                cercleTab[i].show();
                textCercleTab[i].show();
            }
        }

        etiquetteTab[3].animate({
            "x":labelLarg,
            "y":(data.series[3].values[0]*hautMarge-marge/2),
            "width":labelLarg, 
            "height":labelHaut}, 500, "bounce");
        textEtiquetteTab[3].animate({"font-size":13}, 200, "easeIn");
        state = 0;
    }else{
        pathTab[3].show();
        pathTab[0].hide();
        pathTab[1].hide();
        pathTab[2].hide();
        pathTab[3].animate({"stroke-width":"5px"}, "linear");

        for(i=0;i<cercleTab.length;i++){
            if(i<12){
                cercleTab[i].hide(),
                textCercleTab[i].hide()
            }
        }
        for(i=0;i<data.series.length;i++){
            if(i==3){
                etiquetteTab[3].animate({
                    "x":labelLarg-labelLarg*(3/20),
                    "y":(data.series[3].values[0]*hautMarge-marge/2)-3,
                    "width":labelLarg+labelLarg*(3/10), 
                    "height":labelHaut+labelHaut*(3/10)}, 500, "bounce");
                textEtiquetteTab[3].animate({"font-size":18}, 200, "easeIn");
            }else{
                etiquetteTab[i].animate({
                    "x":labelLarg,
                    "y":(data.series[i].values[0]*hautMarge-marge/2),
                    "width":labelLarg, 
                    "height":labelHaut}, 500, "bounce");
                textEtiquetteTab[i].animate({"font-size":13}, 200, "easeIn");
            }
        }
        state = 1;
    } 
}