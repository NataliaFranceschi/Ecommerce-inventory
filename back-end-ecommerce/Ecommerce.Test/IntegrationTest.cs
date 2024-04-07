namespace TrybeHotel.Test;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using System.Net.Http;
using FluentAssertions;
using System.Net.Http.Json;

public class LoginJson
{
    public string? token { get; set; }
}

public class IntegrationTest: IClassFixture<WebApplicationFactory<Program>>
{
     public HttpClient _httpClient;
     public Guid Id { get; set; } = Guid.NewGuid();

     public IntegrationTest(WebApplicationFactory<Program> factory)
    {
        _httpClient = factory.WithWebHostBuilder(builder => {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<ContextTest>(options =>
                {
                    options.UseInMemoryDatabase("InMemoryTestDatabase");
                });
                services.AddScoped<IAppDbContext, ContextTest>();
                services.AddScoped<IProductRepository, ProductRepository>();
                services.AddScoped<IUserRepository, UserRepository>();
                var sp = services.BuildServiceProvider();
                using (var scope = sp.CreateScope())
                using (var appContext = scope.ServiceProvider.GetRequiredService<ContextTest>())
                {
                    appContext.Database.EnsureCreated();
                    appContext.Products.Add(new Product { Id = Id, Name = "product1"});
                    appContext.SaveChanges();
                    appContext.Users.Add(new User { Email = "teste@teste.com", Password = "teste" });
                    appContext.SaveChanges();
                }
            });
        }).CreateClient();
    }

    public async Task AuthenticateUserAsync()
    {
        var inputLogin = new
        {
            Email = "teste@teste.com",
            Password = "teste"
        };

        var responseLogin = await _httpClient.PostAsync("/login", new StringContent(JsonConvert.SerializeObject(inputLogin), System.Text.Encoding.UTF8, "application/json"));
        responseLogin.EnsureSuccessStatusCode();

        var responseLoginString = await responseLogin.Content.ReadAsStringAsync();
        LoginJson jsonLogin = JsonConvert.DeserializeObject<LoginJson>(responseLoginString);
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", jsonLogin.token);
    }

    [Theory(DisplayName = "Should return OK")]
    [Trait("Category", "Endpoint: GET /product")]
    [InlineData("/product")]
    public async Task Get_Products_ProductExists_ReturnSuccessWithProducts(string url)
    {
        await AuthenticateUserAsync();
        var response = await _httpClient.GetAsync(url);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
    }

    [Theory(DisplayName = "Should return Created")]
    [Trait("Category", "Endpoint: POST /product")]
    [InlineData("/product")]
    public async Task Post_SendingValidProduct_ReturnSuccess(string url)
    {
        await AuthenticateUserAsync();

        var newProduct = new Product { Name = "Test Product" };
        var json = JsonConvert.SerializeObject(newProduct);
        var body = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync(url, body);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
    }

    [Theory(DisplayName = "Should return Bad Request")]
    [Trait("Category", "Endpoint: POST /product")]
    [InlineData("/product")]
    public async Task Post_SendingInvalidProduct_ReturnBadRequest(string url)
    {
        await AuthenticateUserAsync();

        var newProduct = new Product(); 
        var json = JsonConvert.SerializeObject(newProduct);
        var body = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync(url, body);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
    }

    [Theory(DisplayName = "Should return OK with matching product")]
    [Trait("Category", "Endpoint: GET /product/search/{param}")]
    [InlineData("/product/search/product1")]
    public async Task GetByName_MatchProduct_ReturnSuccessWithProduct(string url)
    {
        await AuthenticateUserAsync();

        var response = await _httpClient.GetAsync(url);
        var result = await response.Content.ReadFromJsonAsync<List<Product>>();

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        result.Should().NotBeEmpty();
    }

    [Theory(DisplayName = "Should return OK with no matching product")]
    [Trait("Category", "Endpoint: GET /product/search/{param}")]
    [InlineData("/product/search/nonexistentProduct")]
    public async Task GetByName_NoProductsMatch_ReturnSuccessWithEmptyList(string url)
    {
        await AuthenticateUserAsync();

        var response = await _httpClient.GetAsync(url);
        var result = await response.Content.ReadFromJsonAsync<List<Product>>();

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        result.Should().BeEmpty();
    }

    [Theory(DisplayName = "Should return OK with existing product")]
    [Trait("Category", "Endpoint: GET /product/{id}")]
    [InlineData("/product/{id}")]
    public async Task GetById_ProductExists_ReturnSuccessWithProduct(string url)
    {
        await AuthenticateUserAsync();

        var path = url.Replace("{id}", Id.ToString());
        var response = await _httpClient.GetAsync(path);
        var result = await response.Content.ReadFromJsonAsync<Product>();

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        result.Should().NotBeNull();
    }

    [Theory(DisplayName = "Should return Not Found with no product")]
    [Trait("Category", "Endpoint: GET /product/{id}")]
    [InlineData("/product/71c4edda-7588-4620-9679-6f416e92144e")]
    public async Task GetById_ProductDoesNotExist_ReturnNotFound(string url)
    {
        await AuthenticateUserAsync();

        var response = await _httpClient.GetAsync(url);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
    }

    [Theory(DisplayName = "Should return No Content")]
    [Trait("Category", "Endpoint: DELETE /product/{id}")]
    [InlineData("/product/{id}")]
    public async Task Delete_ProductExists_ReturnSuccess(string url)
    {
        await AuthenticateUserAsync();

        var path = url.Replace("{id}", Id.ToString());
        var response = await _httpClient.DeleteAsync(path);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
    }

    [Theory(DisplayName = "Should return Not Found")]
    [Trait("Category", "Endpoint: DELETE /product/{id}")]
    [InlineData("/product/71c4edda-7588-4620-9679-6f416e92144e")]
    public async Task Delete_ProductDoesNotExist_ReturnNotFound(string url)
    {
        await AuthenticateUserAsync();

        var response = await _httpClient.DeleteAsync(url);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
    }

    [Theory(DisplayName = "Should return OK with existing product")]
    [Trait("Category", "Endpoint: PUT /product")]
    [InlineData("/product")]
    public async Task Update_ProductExists_ReturnSuccess(string url)
    {
        await AuthenticateUserAsync();
       
        var updateRequest = new { Id, Name = "updated name" };
        var response = await _httpClient.PutAsJsonAsync(url, updateRequest);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
    }

    [Theory(DisplayName = "Should return Not Found with no product")]
    [Trait("Category", "Endpoint: PUT /product")]
    [InlineData("/product/")]
    public async Task Update_ProductDoesNotExist_ReturnNotFound(string url)
    {
        await AuthenticateUserAsync();

        var nonExistentProductId = Guid.NewGuid();
        var updateRequest = new { Id = nonExistentProductId, Name = "updated name" };


        var response = await _httpClient.PutAsJsonAsync(url, updateRequest);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
    }
}