import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-tab-orders',
  templateUrl: './tab-orders.component.html',
  styleUrls: ['./tab-orders.component.scss'],
})
export class TabOrdersComponent {
  @Input()
  user!: any;
  pastOrders!: any;
  ongoingArray!: any;
  orderArray!: any;

  console() {
    console.log(this.orderArray);
    console.log(this.ongoingArray);
    console.log(this.pastOrders);
  }

  // Cette fonction envoie tous les elements du panier dans le localstorage vers la database
  sendAllItemsToDb() {
    if (localStorage.getItem('cart')) {
      let items = JSON.parse(localStorage.getItem('cart') || '[]');
      items.map((item: any) => {
        console.log(item);
        this.orderService.addProductToDb(item).subscribe((data: any) => {
          if (data[1] === 200) {
            item.stock--;
            console.log(item.stock);
          } else {
            this.snackBar.open(
              `${data[0] || "Un stock n'est plus disponible"}`,
              'OK'
            );
          }
          console.log(data);
        });
      });
      console.log('fini');
      localStorage.removeItem('cart');
    } else {
      console.log('rien de trouvé dans le localStorage');
    }
  }

  ngOnInit(): void {
    if (this.auth.hasntConnectedYet) {
      this.snackBar.open(`Bienvenue ${this.user.prenom}`, 'OK');
      this.orderService.getOrdersByUserId(this.user.id).subscribe((data) => {
        this.orderService.loadPastCommandes = true;
        console.log('fetched all the array');
        this.orderArray = data;
        this.ongoingArray = this.orderArray.filter(
          (order: any) => order.statut === 'en cours'
        );
        this.orderService.pastOrders = this.orderArray.filter(
          (order: any) =>
            order.statut === 'terminee' ||
            order.statut === 'livraison' ||
            order.statut === 'attente_livraison'
        );
        this.pastOrders = this.orderService.getPastOrders();

        console.log(this.ongoingArray);
        if (this.ongoingArray.length === 0) {
          //pas de commande existante pour l'utilisateur, on va donc la créer

          console.log('no ongoing orders');
          console.log('on va donc la créer');
          this.orderService.createOrder(this.user.id).subscribe((data: any) => {
            console.log('commande créée');
            console.log(data);
            this.orderService.orderId = data.created;
            localStorage.setItem('orderId', data.created);
            this.cartService.loadCartItemsFromDb();
            // On rajoute cette ligne pour bien dire au navigateur de retenir cette commande, sinon, si l'utilisateur ne se connecte pas on ne pas pas chercher son id de commande
            console.log('on rajoute les items du localStorage si existants');
            this.sendAllItemsToDb();
          });
        } else {
          console.log('il y a bien une commande');
          this.orderService.orderId = this.ongoingArray[0].id;
          localStorage.setItem('orderId', this.ongoingArray[0].id);
          // On rajoute cette ligne pour bien dire au navigateur de retenir cette commande, sinon, si l'utilisateur ne se connecte pas on ne pas pas chercher son id de commande
          console.log(this.orderService.orderId);
          this.cartService.loadCartItemsFromDb();
          console.log('on rajoute les items du localStorage si existants');
          this.sendAllItemsToDb();
        }
        this.auth.hasntConnectedYet = false;
        console.log(this.auth.hasntConnectedYet);
        // Ca permet de ne fetch ces données qu'une fois
      });
    }
    if (!this.orderService.loadPastCommandes) {
      this.orderService
        .getOrdersByUserId(this.user.id)
        .subscribe((data: any) => {
          console.log('fetched all the array');
          this.orderService.pastOrders = data.filter(
            (order: any) =>
              order.statut === 'terminee' ||
              order.statut === 'livraison' ||
              order.statut === 'attente_livraison'
          );
          // if(this.pastOrders.length > 0){
          this.pastOrders = this.orderService.getPastOrders();
          this.orderService.loadPastCommandes = true;
          // }
        });
    }
    this.pastOrders = this.orderService.getPastOrders();
  }

  constructor(
    private orderService: OrdersService,
    private auth: AuthService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}
}
