import { ArrowRight, Calculator, ClipboardCheck, HardHat, LineChart, Settings, Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banlog.jpg-DK2GQP0o6rIfxQYIZJNK4e8SP8Ip3e.jpeg"
          alt="Construction background"
          className="absolute inset-0 object-cover"
          fill
          priority
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/log.jpg-xv6HmPoU9Zcra1NCLvLV8ovFpxzYCP.jpeg"
            alt="Nosotros Construcciones Logo"
            width={200}
            height={200}
            className="mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">NOSOTROS CONSTRUCCIONES</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Sistema integral de gestión para proyectos de construcción
          </p>
          <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-600">
            Comenzar Ahora <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestras Funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Calculator className="w-10 h-10 text-yellow-500 mb-2" />
                <CardTitle>Generador de Presupuestos</CardTitle>
                <CardDescription>Crea presupuestos detallados de manera rápida y profesional</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Crear Presupuesto
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <HardHat className="w-10 h-10 text-yellow-500 mb-2" />
                <CardTitle>Gestión de Productos</CardTitle>
                <CardDescription>Administra tu inventario y catálogo de productos</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Productos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ClipboardCheck className="w-10 h-10 text-yellow-500 mb-2" />
                <CardTitle>Generador de Contratos</CardTitle>
                <CardDescription>Crea y gestiona contratos de manera eficiente</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Crear Contrato
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <LineChart className="w-10 h-10 text-yellow-500 mb-2" />
                <CardTitle>Estadísticas</CardTitle>
                <CardDescription>Analiza el rendimiento de tu negocio</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Estadísticas
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Star className="w-10 h-10 text-yellow-500 mb-2" />
                <CardTitle>Reseñas</CardTitle>
                <CardDescription>Gestiona las opiniones de tus clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Reseñas
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-yellow-500 mb-2" />
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>Administra los usuarios del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Gestionar Usuarios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admin Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">Panel de Administración</h2>
              <p className="text-gray-300 mb-8">
                Accede a todas las herramientas de gestión desde un solo lugar. Controla productos, presupuestos,
                contratos y más.
              </p>
              <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                Acceder al Panel <Settings className="ml-2" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded">
                    <h3 className="font-semibold mb-2">Productos</h3>
                    <p className="text-yellow-500 text-2xl font-bold">150+</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded">
                    <h3 className="font-semibold mb-2">Presupuestos</h3>
                    <p className="text-yellow-500 text-2xl font-bold">300+</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded">
                    <h3 className="font-semibold mb-2">Contratos</h3>
                    <p className="text-yellow-500 text-2xl font-bold">100+</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded">
                    <h3 className="font-semibold mb-2">Usuarios</h3>
                    <p className="text-yellow-500 text-2xl font-bold">50+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nosotros%20Log-XYcdDZ01OHG3kv1jm3fJr64kvUPEqY.png"
                alt="Nosotros Logo"
                width={100}
                height={100}
                className="mb-4"
              />
              <p className="text-gray-400">© 2024 Nosotros Construcciones. Todos los derechos reservados.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Productos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-yellow-500">
                      Catálogo
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-yellow-500">
                      Precios
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Servicios</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-yellow-500">
                      Presupuestos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-yellow-500">
                      Contratos
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Soporte</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-yellow-500">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-yellow-500">
                      Ayuda
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}