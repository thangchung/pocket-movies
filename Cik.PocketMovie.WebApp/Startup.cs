using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Cik.PocketMovie.WebApp.Startup))]
namespace Cik.PocketMovie.WebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
