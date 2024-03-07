declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

interface Window {
  raleon:
    | {
        walletConnected: (address: string) => void
      }
    | undefined
}

declare const setupRaleonParameters: ((id: number) => void) | undefined
