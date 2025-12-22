"use client";
import { Button, HStack } from "@chakra-ui/react"
import { CloseButton, Drawer, Portal } from "@chakra-ui/react"
export default function Page() {
	return (
		<>
			<div className="barra-superior">
        <Drawer.Root placement="start">
          <Drawer.Trigger asChild>
            <Button variant="plain" size="md" className="drawer">
              ≡
            </Button>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Body>
                  <HStack wrap="wrap" gap="6" className="botones-drawer-principal">
                    <Button colorPalette="cyan" variant="subtle"> +Agregar </Button>
                    <Button colorPalette="cyan" variant="subtle"> Mochila 1 </Button>
                  </HStack>
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>   
        <p className="titulo-app">preorganizate</p>
        <div style={{ width: '80px' }}></div> 
      </div>
      <div className="contenido-principal">
        <Drawer.Root placement="end">
          <Drawer.Trigger asChild>
            <HStack wrap="wrap" gap="6">
              <Button colorPalette="cyan" variant="subtle"> +Agregar </Button>
            </HStack>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Body>
                  {/*imagenes seleccionables para que el usuario pueda elegir una imagen para su mochila*/}
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>   
      </div>
		</>
	)
}