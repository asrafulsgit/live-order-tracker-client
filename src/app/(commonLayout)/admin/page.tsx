import AdminOrders from "@/components/admin/AdminOrders";

function AdminPage() {
  //   if (loading || !role) {
  //     return (
  //       <div className="flex min-h-screen items-center justify-center">
  //         <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  //       </div>
  //     );
  //   }

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage all orders and update statuses.
          </p>
        </div>

        <AdminOrders />
      </main>
    </>
  );
}

export default AdminPage;
