import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Logger } from '../../../providers/logger/logger';

// Pages
import { AmountPage } from '../../send/amount/amount';
import { AmazonCardsPage } from './amazon-cards/amazon-cards';

// Providers
import { AmazonProvider } from '../../../providers/amazon/amazon';
import { ExternalLinkProvider } from '../../../providers/external-link/external-link';

@Component({
  selector: 'page-amazon',
  templateUrl: 'amazon.html',
})
export class AmazonPage {

  public network: string;
  public giftCards: any;

  constructor(
    private navCtrl: NavController,
    private amazonProvider: AmazonProvider,
    private externalLinkProvider: ExternalLinkProvider,
    private logger: Logger
  ) {
  }

  ionViewDidLoad() {
    this.logger.info('ionViewDidLoad AmazonPage');
    this.network = this.amazonProvider.getNetwork();
    this.initAmazon();
  }

  public openExternalLink(url: string) {
    this.externalLinkProvider.open(url);
  }

  public goTo(page: string): void {
    switch (page) {
      case 'Amount':
        this.navCtrl.push(AmountPage, {
          nextPage: 'BuyAmazonPage',
          currency: 'USD',
          coin: 'btc',
          fixedUnit: true,
        });
        break;
      case 'AmazonCards':
        this.navCtrl.push(AmazonCardsPage, {
          invoiceId: null
        });
        break;
    }
  }

  private initAmazon(): void {
    this.amazonProvider.getPendingGiftCards((err: any, gcds: any) => {
      if (err) this.logger.error(err);
      this.giftCards = gcds;
    });
  }

}
