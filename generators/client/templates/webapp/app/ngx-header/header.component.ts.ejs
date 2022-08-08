import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';


import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// aggiunta
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  // aggiunta
  inProduction?: boolean;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];

  entitiesSelectControl=new FormControl('');
  adminSelectControl=new FormControl('');
  accountSelectControl=new FormControl('');
  languageSelectControl=new FormControl('');

  //

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              // aggiunta
              private loginService: LoginService,
              private translateService: TranslateService,
              private sessionStorageService: SessionStorageService,
              private accountService: AccountService,
              private profileService: ProfileService,
              private router: Router
              ) {
              if (VERSION) {
                  this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
              }         
  }

  ngOnInit() {
    // aggiunta
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
   //

    this.currentTheme = this.themeService.currentTheme;


    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
      
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  // aggiunta

  goToEntityPages(entityNamePath: string) {
   this.entitiesSelectControl.reset('');
   this.router.navigate([entityNamePath]);
  }
  goToAdminPages(adminPath: string) {
    this.adminSelectControl.reset('');
    this.router.navigate([adminPath]);
  }

  performLoginOrLogout(loginOrLogout: string) {
    this.accountSelectControl.reset('');
    if(loginOrLogout==='login'){
      this.login();
    }
    else {
      this.logout();
    }
  }

  changeLanguage(languageKey: string): void {
    this.languageSelectControl.reset('');
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);

    this.entitiesSelectControl.reset('');
    this.adminSelectControl.reset('');
    this.accountSelectControl.reset('');

  }


  login(): void {
    this.loginService.login();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }
//
}
