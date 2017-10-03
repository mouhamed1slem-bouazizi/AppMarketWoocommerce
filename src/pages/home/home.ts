import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

    this.page = 2;

    this.WooCommerce = WC({
      url: "http://chocolate.derdar.sa/",
      consumerKey: "ck_b38109b4607b86e6d8d1ca79feb5c09e0592b3ff",
      consumerSecret: "cs_90d18b821a79b03f9d0f7b852559beb425ad4acf"
    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad(){
    setInterval(()=> {

      if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
    }, 3000)
  }

  loadMoreProducts(event){
    console.log(event);
    if(event == null)
    {
      this.page = 2;
      this.moreProducts = [];
    }
    else
      this.page++;

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null)
      {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products!",
          duration: 5000
        }).present();

      }


    }, (err) => {
      console.log(err)
    })
  }

}
