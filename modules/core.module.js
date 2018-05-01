const config = require('../config');
var core = {
    getSemestre:()=>{return config.semestre;},
    getAnneeScolaire:()=>{return config.annee_scolaire;},
    getSemaine:()=>{return "A";},
    getDay:()=>{
        var day = new Date();
        day= day.getDay();
        switch(day){
            case 0: return "DIMANCHE";break;
            case 1: return "LUNDI";break;
            case 2: return "MARDI";break;
            case 3: return "MERCREDI";break;
            case 4: return "JEUDI";break;
            case 5: return "VENDREDI";break;
            case 6: return "DIMANCHE";break;
        }
    },
    date_isGreater:(date1,date2)=>{
        if(date1.hour>date2.hour){
            return true;
        }
        else if(date1.hour<date2.hour){
            return false;
        }
        else{
            return date1.minute>=date2.minute
        }
    }
}

module.exports = core;