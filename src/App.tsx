import type { PropsWithChildren } from "react"
import { RouterProvider } from "react-router"
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { tableDevtoolsPlugin } from '@tanstack/react-table-devtools'
import { Toaster } from "@/components/ui/sonner"

import { appRouter } from "./app.router"

import { useAuthStore } from "./auth/store/auth.store"
import { FullscreenLoader } from "./shared/Components/FullscreenLoader"

const queryClient = new QueryClient()

//Se implementa esto para verificar si elusuario esta autenticado
const CheckAuthProvider = ({ children } : PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore()

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5, //revalidar sesion cada hora media
    refetchOnWindowFocus: true, //revalidar sesion  despues de una suspencion de pantalla
  });

  if( isLoading )
      return <FullscreenLoader />
  
 return children;
}

export const App = () => {
 

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      {/* Custom Provider */}
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackDevtools plugins={[tableDevtoolsPlugin()]} />
    </QueryClientProvider>
  )
}
