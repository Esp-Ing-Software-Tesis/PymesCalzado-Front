import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './app/core/interceptors/loader.interceptor';

(async () => {
  try {
    await bootstrapApplication(AppComponent, {
      providers: [
        provideRouter(
          routes,
          withInMemoryScrolling({
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
          }),
        ),
        provideHttpClient(withInterceptors([loaderInterceptor])),
      ],
    });
  } catch (err) {
    console.error(err);
  }
})();