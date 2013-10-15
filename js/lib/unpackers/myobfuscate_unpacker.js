//
// Author: Miguel Lopes
// URL: http://miguellopes.net
// 
// 
var MyObfuscate = {
    dominio: "",
    detect: function (str) {
        if (/^eval/.test(str)) {
            return true;
        }

        return true


        return false;
    },
    /*    bool: function (k) {
		    var i = true;
		    for (var g, f = 0, m; f < k.length; f++) {
		    	
        		m = parseInt(k.charAt(f), 16).toString(2);
    	  		g = f == 0 ? m.charAt(m.length -1) : g ^ m.charAt(m.length - 1);
	    }
    	return g ? i : !i;
	},*/
    unscramble: function (str) {

        var linhas = str.split(/\r\n|\n|\r/);
        var vari = /[A-Z0-9]{1,2} (=|\+=) \([0-9a-z".:?!=()'<>, ]+\)(,|;)/ig
        var val1 = /([^ift ])\(\([><=!0"'-9A-Z.,() ]{1,} \? [><=!0"'-9A-Z.,() ]{1,} : [><=!0"'-9A-Z.,() ]{1,} \? [><=!0"'-9A-Z.,() ]{1,} : [><=!0"'-9A-Z.,() ]{1,} \? [><=!0"'-9A-Z.,() ]{1,} \: [><=!0"'-9A-Z.,() ]{1,}\)\)/ig
        var ir = /([^ift ])\([><=!"'0-9A-Z.,() ]{1,} \? [><=!"'0-9A-Z.,() ]{1,} : [><=!"'0-9A-Z.,() ]{1,}\)/ig;
        var antitempo = /[A-Z0-9]{2}\.[A-Z0-9]{2}\("[0-9A-Z]{1,4}"\)/ig;
        var antidominio = /[A-Z0-9]{1,3}\[[A-Z0-9]{1,3}\]\[[A-Z0-9]{1,3}\]/ig;
        var ifb = /[if ]{2,3} \((.*)\)/ig;
        var parent = /\(|\)/ig

        var finali = "";
        for (var i = 0; i < linhas.length; i++) {

            /*							if(linhas[i].match(antitempo) != null && $("#antitempo").prop('checked')) {

								mat = linhas[i].match(antitempo)[0];
								//console.log(mat);
								var xpto,t = "xpto = MyObfuscate.bool("+mat.substr(6);
								//console.log("valor a substituir: "+t);
								eval(t);
								var tmp1 = linhas[i].replace(mat,xpto);
								finali += tmp1+"\n";
							}
							else*/
            if (linhas[i].match(antidominio) && $("#antidominio").prop('checked')) {

                var tmp1 = linhas[i].replace(linhas[i].match(antidominio)[0], '"' + MyObfuscate.dominio + '"');
                finali += tmp1 + "\n";

            } else if (linhas[i].match(ifb) != null && $("#ifternario").prop('checked')) {

                mat = linhas[i].match(ifb)[0];
                mat = mat.substr(5, (mat.length - 4));

                var fin = "if (",
                    args = new Array();

                for (var pos = lastpos = aberto = 0; pos < mat.length; pos++) {




                    if (aberto == 0 && (mat[pos].match(/=|<|>|\!|\)|&|\| /) != null) && (pos - lastpos) > 1) {
                        var unscramble = "";
                        var t = "unscramble = " + mat.substr(lastpos, (pos - lastpos));

                        var espeto = false;
                        if (mat.substr(lastpos, (pos - lastpos)).match(parent) == null) {
                            espeto = true;
                        } else
                            try {
                                eval(t);
                            } catch (e) {
                            console.log(e);
                            espeto = true;
                        }


                        if (!espeto && typeof (unscramble) != "object") {
                            fin += "(" + unscramble + ") ";

                            for (var n = 1, si = 1; mat[pos + n] == "=" || mat[pos + n] == "&" || mat[pos + n] == "|"; n += 1)
                                si += 1;

                            fin += mat.substr(pos, si);
                        } else {

                            for (var n = 1, si = 1; mat[pos + n] == "=" || mat[pos + n] == "&" || mat[pos + n] == "|"; n += 1)
                                si += 1;

                            fin += mat.substr(lastpos, (pos - lastpos) + si);
                        }
                        lastpos = pos + si;
                    }

                    if (mat[pos] == "(")
                        if (aberto == 0) {
                            fin += mat.substr(lastpos, (pos - lastpos));
                            lastpos = pos;
                            aberto += 1;
                        } else
                            aberto += 1;
                    if (mat[pos] == ")")
                        aberto -= 1;

                }

                finali += fin + ") //" + mat + "\n";


            } else
                mat = linhas[i];


            var fin = "",
                lastpos = 0;

            if (mat.match(parent) != null)
                for (var pos = aberto = 0; pos < mat.length; pos++) {

                    if (aberto == 0 && (mat[pos].match(/ |\+|\-|\*|\\|\%|,|;|/) != null) && (pos - lastpos) > 3 && lastpos > 0) {
                        var unscramble = "";
                        var t = "unscramble = " + mat.substr(lastpos, (pos - lastpos));
                        //		console.log("["+i+"] A executar: "+t+" ("+(pos  - lastpos)+")");
                        var espeto = false;
                        if (mat.substr(lastpos, (pos - lastpos)).match(parent) == null || mat.substr(lastpos, (pos - lastpos)).length < 20) {
                            espeto = true;
                        } else
                            try {
                                eval(t);
                            } catch (e) {
                            //console.log(mat);
                            espeto = true;

                        }
                        //	console.log(typeof(unscramble)+" "+espeto);

                        if (!espeto && typeof (unscramble) != "object") {
                            fin += "(" + unscramble + ") ";

                            for (var n = 1, si = 1; mat[pos + n] == "=" || mat[pos + n] == "&" || mat[pos + n] == "|"; n += 1)
                                si += 1;

                            fin += mat.substr(pos, si);
                            //	console.log("["+i+"] executado "+unscramble );
                        } else {

                            for (var n = 0, si = 0; mat[pos + n] == "=" || mat[pos + n] == "&" || mat[pos + n] == "|" || mat[pos + n] == " " || mat[pos + n] == "\n" || mat[pos + n] == ";"; n += 1)
                                si += 1;
                            //	console.log("["+i+"] SI: "+si);
                            fin += mat.substr(lastpos, (pos - lastpos) + si);
                        } // else if(pos == )
                        lastpos = pos + si;
                    }



                    if (mat[pos] == "(")
                        if (aberto == 0) {
                            fin += mat.substr(lastpos, (pos - lastpos));
                            lastpos = pos;
                            aberto += 1;
                            //	console.log("["+i+"] "+fin);
                        } else
                            aberto += 1;
                    if (mat[pos] == ")")
                        aberto -= 1;
                }


            if (mat.length > 0 && lastpos > 0)
                if (pos > lastpos)
                    finali += fin + mat.substr(lastpos) + ((fin.length + mat.substr(lastpos).length) == mat.length ? "" : " //" + mat.trim() + "\n");
                else
                    finali += fin + ((fin.length + mat.substr(lastpos.length)) == mat.length ? "" : " //" + mat.trim() + "\n");
                else
                    finali += mat + "\r\n";
        }
        //}

        return finali;
    },
    unpack: function (str) {
        if (MyObfuscate.detect(str)) {

            if (/unpk/.test(str)) {
                eval(str);
                var bsource = js_beautify(unpk);

                return this.unscramble(bsource);
            } else if (/^eval/.test(str)) {

                var modified_source = str.replace('eval(', '(unpk=');


                try {
                    if (modified_source.match(/=.{1,3}\[.{1,3}\]\[.{1,3}\],/ig)) {

                        MyObfuscate.dominio = prompt("Dominio do Script", window.document.domain);
                        eval(modified_source.replace(/=.{1,3}\[.{1,3}\]\[.{1,3}\],/, '="' + MyObfuscate.dominio + '",'));

                    } else {
                        alert("Sem Domain lock");
                        eval(modified_source);
                    }
                } catch (e) {
                    alert("Dominio Errado");
                    return false;
                }


                var unpacked_source = MyObfuscate.unscramble(js_beautify(unpk));
                return unpacked_source;

            } else {

                return this.unscramble(str);
            }

            return "FAIL :" + unpacked_source;
        }
    }



};