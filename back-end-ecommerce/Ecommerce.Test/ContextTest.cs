using Microsoft.EntityFrameworkCore;

public class ContextTest : DbContext, IAppDbContext
{
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public ContextTest(DbContextOptions<ContextTest> options) : base(options)
    { }

}