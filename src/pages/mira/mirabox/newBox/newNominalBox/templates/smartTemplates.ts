import {Component} from "@angular/core";
import {Web3Provider} from "../../../../../../providers/mirabox/web3/web3";
import {SmartboxTemplatesProvider} from "../../../../../../providers/mirabox/smartbox-templates/smartbox-templates";

@Component({
  selector: 'page-smarttemplates',
  templateUrl: 'smartTemplates.html'
})


export class SmartTemplatesPage {
  public templatesList;
  public chosenTemplate;
  constructor(private web3Provider:Web3Provider,
              private smartboxTemplatesProvider: SmartboxTemplatesProvider){
    this.smartboxTemplatesProvider.updateTemplateList().then((result) => { this.templatesList = result;})
  }
  public openDescription(template){
    template.opened = true;
    this.templatesList.forEach((item, i , arr) => {if(item!=template) arr[i].opened = false;})
  }
  public closeAllDescriptions(){
    this.templatesList.forEach((item, i , arr) => {arr[i].opened = false;})
  }
  public test(){
    let web3 = this.web3Provider.getWeb3();
    this.web3Provider.checkConnection();
  }
}
