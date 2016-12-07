import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import 'moment-timezone';

import { Instance, Navigation, NavService } from './nav.service';

// moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';

// moment.fn.toString = function () {Í
//   return this.clone().locale('en').format(moment.defaultFormat);
// }


@Component({
  moduleId: module.id,
  selector: 'nav',
  templateUrl: 'nav.component.html'
})
export class NavComponent implements OnInit {

  private maxDateFrom: Date = moment().toDate();
  private minDate: Date;
  public dtTo: moment.Moment = moment();
  public dtFrom: moment.Moment = moment().subtract(1, 'h');
  public dtToCal: Date = moment().toDate();
  public dtFromCal: Date = (moment().subtract(1, 'd').toDate());
  public dbServers: Array<Instance>;
  public isDropdownOpen: boolean = false;
  public navigation: Navigation = new Navigation();
  private navigationSubscription: Subscription;
  private alertSubscription: Subscription;
  public alert: string;


  public constructor(private route: ActivatedRoute, private router: Router, private navService: NavService) {
    // select db server
    this.navigationSubscription = this.navService.navigation$.subscribe(nav => {
      this.navigation = nav;
    });

    this.alertSubscription = this.navService.alert$.subscribe(alert => {
      this.alert = alert;
    });
  }

  protected closeAlert() {
    this.alert = '';
  }


  protected setTimeZone(tz: string = 'utc') {
    if (tz === 'utc') {
      moment.tz.setDefault('UTC');
      console.log('UTC', moment().format('YYYY-MM-DD HH:mm:ss Z'));
    } else {
      moment.tz.setDefault();
      console.log('Local', moment().format('YYYY-MM-DD HH:mm:ss Z'));
    }
  }

  protected setQuickRange(num: number = 0, unit: string = 's') {
    let to = moment().format();
    let from = moment().subtract(num, unit).format();
    this.router.navigate(['mysql/profile', this.navigation.dbServer.Name, 'from', from, 'to', to]);
  }

  protected setTimeRange(from, to) {
    let paramFrom = moment([from.year, from.month-1, from.day]).format();
    let paramTo = moment([to.year, to.month-1, to.day]).format();
    console.log('setTimeRange: ', from, to, paramFrom, paramTo);
    this.router.navigate(['mysql/profile', this.navigation.dbServer.Name, 'from', paramFrom, 'to', paramTo]);
  }

  protected getDBLogo(distro: string): string {
    let src: string;
    switch (true) {
      case distro.indexOf('Percona Server') !== -1:
        src = 'img/percona-server-black-50.png';
        break;
      case distro.indexOf('Percona XtraDB') !== -1:
        src = 'img/Percona_XtraDB_Cluster.png';
        break;
      default:
        src = 'img/database.png';
        break;
    }
    return src;
  }

  protected getDBServers() {
    this.navService
      .getDBServers()
      .then(dbServers => {
        this.dbServers = dbServers;
      })
      .catch(err => console.log(err));
  }

  public ngOnInit() {
    this.getDBServers();
  }

  public ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    this.alertSubscription.unsubscribe();
  }
}