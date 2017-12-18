import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import * as stat from "simple-statistics";
import * as math from "mathjs";
import * as jstat from "jstat";



@Component({
  selector: 'page-frecuencia',
  templateUrl: 'frecuencia.html'
})
export class FrecuenciaPage {
  public prueba;
  public frecuencia;
  public num : number;
  public def_text : String ;
  public par_text: String;
  public res_text: String;
  public res_text2: String;
  public res_text3: String;
  public res_text4: String;
  public res_text5: String;
  public res_text6: String;
  public res_text7: String;
  public res_text8: String;
  public visible: Boolean;
  public buttonDisabled = false;

    
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.prueba = formBuilder.group({
      dat: ['', Validators.compose([Validators.required])]
    });
    this.def_text= "<p>Ingresando datos a granel, podemos calcular lo que llamamos Estadísticos, que sirven para sacar conclusiones, por ejemplo, de cual es la edad promedio de un curso. </p>";
    this.par_text="<p>Media Aritmética (promedio) = La media aritmética es la suma de todos los datos dividida entre el número total de datos. Se calculan dependiendo de cómo vengan ordenados los datos. </p><p> Moda = La moda de un conjunto de datos es el dato que más veces se repite, es decir, aquel que tiene mayor frecuencia absoluta. Se denota por Mo. En caso de existir dos valores de la variable que tengan la mayor frecuencia absoluta, habría dos modas. Si no se repite ningún valor, no existe moda.  </p><p> Mediana (me) = La mediana es el valor que ocupa el lugar central entre todos los valores del conjunto de datos, cuando estos están ordenados en forma creciente o decreciente. La mediana se representa por (Me).</p><p> Varianza = varianza en estadística es la raíz cuadrada de la desviación estándar, siendo una media de las frecuencias con la media elevadas al cuadrado. </p>";
    

  }
  tabla(){
   
    var vector = this.prueba.value.dat; 
    var split = vector.split(",").map(Number);
    var contar = split.length;
      console.log(contar);
  
    if ((contar<51) && (contar>1)){
      this.visible = true;
  
      this.res_text = jstat.jStat(split).mean().toFixed(3);
      this.res_text2 = jstat.jStat(split).max();
      this.res_text3 = jstat.jStat(split).min();
      this.res_text4 = jstat.jStat(split).mode();
      this.res_text5 = jstat.jStat(split).median().toFixed(3);
      this.res_text6 = jstat.jStat(split).variance().toFixed(3);
      this.res_text7 = split.sort();

      this.buttonDisabled = true;
      
    }else{
          this.visible = false;
          let alert = this.alertCtrl.create({
            title: "Error de Cálculo",
            message: 'Verifique que haya ingresado al menos dos parametros y máximo 50',
            buttons: ['OK']
          });
          alert.present();
      } 
    }
      

    //  var prom = jstat.jStat(split).mean();
    //  console.log(prom);
    //  var max = jstat.jStat(split).max();
    //  console.log(max);
    //  var min = jstat.jStat(split).min();
    //  console.log(min);
    //  var moda = jstat.jStat(split).mode();
    //  console.log(moda);
    //  var mediana = jstat.jStat(split).median();
    //  console.log(mediana);
    //  var varianza = jstat.jStat(split).variance();
    //  console.log(varianza);
    //  var orden = split.sort();
    //  console.log(orden);
    


    reset(){
      this.prueba.reset();
      this.buttonDisabled = false;
      this.visible = false;
      this.res_text = null;
      this.res_text2 = null;
      this.res_text3 = null;
      this.res_text4 = null;
      this.res_text5 = null;
      this.res_text6 = null;
      this.res_text7 = null;
    }
  }
