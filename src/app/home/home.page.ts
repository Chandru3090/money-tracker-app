import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FilterPopoverComponent } from './components/filter-popover/filter-popover.component';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  transactions = [
    {
      id: 1,
      date: {
        fullDate: new Date().getTime(),
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        day: this.weekday[new Date().getDay()],
        year: new Date().getFullYear(),
      },
      category: 'Friends',
      reason: 'Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure',
      type: 'INCOME',
      amount: 2000
    },
    {
      id: 2,
      date: {
        fullDate: new Date().getTime(),
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        day: this.weekday[new Date().getDay()],
        year: new Date().getFullYear(),
      },
      category: 'Phone Bill',
      reason: 'Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure',
      type: 'EXPENSE',
      amount: 200
    },
    {
      id: 3,
      date: {
        fullDate: new Date().getTime(),
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        day: this.weekday[new Date().getDay()],
        year: new Date().getFullYear(),
      },
      category: 'Petrol',
      reason: 'Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure',
      type: 'EXPENSE',
      amount: 500
    },
    {
      id: 4,
      date: {
        fullDate: new Date().getTime(),
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        day: this.weekday[new Date().getDay()],
        year: new Date().getFullYear(),
      },
      category: 'House',
      reason: 'Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure',
      type: 'EXPENSE',
      amount: 1000
    },
    {
      id: 5,
      date: {
        fullDate: new Date().getTime(),
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        day: this.weekday[new Date().getDay()],
        year: new Date().getFullYear(),
      },
      category: 'Petrol',
      reason: 'Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure',
      type: 'EXPENSE',
      amount: 500
    },
    {
      id: 6,
      date: {
        fullDate: new Date().getTime(),
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        day: this.weekday[new Date().getDay()],
        year: new Date().getFullYear(),
      },
      category: 'House',
      reason: 'Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure',
      type: 'EXPENSE',
      amount: 1000
    }
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  
  income = this.transactions.filter(x => x.type === 'INCOME').reduce((sum, record) => sum + record.amount, 0);
  expense = this.transactions.filter(x => x.type === 'EXPENSE').reduce((sum, record) => sum + record.amount, 0);
  total = +(this.income - this.expense);
  public pieChartLabels: Label[] = ['Income', 'Expense'];
  public pieChartData: number[] = [this.income, this.expense];
  public chartType: ChartType = 'pie';
  public pieChartLegend = true;
  constructor(public popoverController: PopoverController) { }
  public pieChartColors = [
    {
      backgroundColor: this.getRandomColors(2),
    },
  ];
  ngOnInit() { }

  async filterPopover(ev: any) {
    const siteInfo = { id: 1, name: 'edupala' };
    const popover = await this.popoverController.create({
      component: FilterPopoverComponent,
      event: ev,
      componentProps: {
        site: siteInfo
      },
      translucent: true,
    });

    popover.onDidDismiss().then((result) => {
      console.log(result.data);
    });

    return await popover.present();
    /** Sync event from popover component */

  }

  getRandomColors(length) {
    return [...Array(length)].map(x => this.convertHexToRGBA("#" + ("000000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6), 60));
  }

  convertHexToRGBA(hex, opacity) {
    const tempHex = hex.replace('#', '');
    const r = parseInt(tempHex.substring(0, 2), 16);
    const g = parseInt(tempHex.substring(2, 4), 16);
    const b = parseInt(tempHex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity / 100})`;
  }

  chartToggle() {
    this.chartType = (this.chartType==='pie') ? 'doughnut' : 'pie';
  }
}
