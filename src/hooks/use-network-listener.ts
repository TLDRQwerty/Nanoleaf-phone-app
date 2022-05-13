import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useEffect, useState } from 'react';

export default function useNetworkListener() {
    const [s, setS] = useState<NetInfoState | null>(null)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(setS)

        const id = setInterval(async () => {
            setS(await NetInfo.refresh())
        }, 10000)

        return () => {
            clearInterval(id)
            unsubscribe()
        }
    }, [])

    return s
}