import { RouterProvider } from "react-router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { tableDevtoolsPlugin } from '@tanstack/react-table-devtools'
import { appRouter } from "./app.router"

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackDevtools plugins={[tableDevtoolsPlugin()]} />
    </QueryClientProvider>
  )
}
