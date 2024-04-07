using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

public static class DatabaseExtension
{
    public static void ConfigureDatabase(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Default");
        var dbPassword = configuration["DatabasePassword"];
        var dbServerName = configuration["DatabaseServerName"];

        var connectionStringBuilder = new SqlConnectionStringBuilder(connectionString);
        connectionStringBuilder.Password = dbPassword;
        connectionStringBuilder.DataSource = dbServerName;

        services.AddDbContext<IAppDbContext, AppDbContext>(options =>
        {
            options.UseSqlServer(connectionStringBuilder.ConnectionString);
        });

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();

    }

}
