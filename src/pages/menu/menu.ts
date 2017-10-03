import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api';
import { ProductsByCategory } from '../products-by-category/products-by-category'

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: Component;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
    this.categories = [];

     this.WooCommerce = WC({
      url: "http://chocolate.derdar.sa/",
      consumerKey: "ck_b38109b4607b86e6d8d1ca79feb5c09e0592b3ff",
      consumerSecret: "cs_90d18b821a79b03f9d0f7b852559beb425ad4acf"
    });


    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for( let i = 0; i < temp.length; i ++){
        if(temp[i].parent == 0){

          if(temp[i].slug == "chocolate"){
            temp[i].icon = "ribbon";
          }
          if(temp[i].slug == "dragee"){
            temp[i].icon = "egg";
          }
          if(temp[i].slug == "flowers"){
            temp[i].icon = "rose";
          }
          if(temp[i].slug == "plates"){
            temp[i].icon = "basket";
          }
          if(temp[i].slug == "vases"){
            temp[i].icon = "pint";
          }

          this.categories.push(temp[i]);
        }
      }

    }, (err)=> {
      console.log(err)
    })

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

  openCategoryPage(category){

    this.childNavCtrl.setRoot(ProductsByCategory, { "category":  category});

  }
  

}
