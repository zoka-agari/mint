// components/referral/steps/WalletStep.tsx
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/use-wallet';
import { Wallet, Loader2 } from 'lucide-react';

interface WalletStepProps {
    onConnect: (address: string) => void;
    loading: boolean;
}

export const WalletStep = ({ onConnect, loading }: WalletStepProps) => {
    const { connecting, connect } = useWallet();

    const handleConnect = async () => {
        const address = await connect();
        if (address) {
            onConnect(address);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">
                Connect Your Wallet
            </h3>
            <p className="text-gray-600 text-center">
                Connect your ArConnect wallet to get started
            </p>
            <Button
                className="w-full py-6"
                onClick={handleConnect}
                disabled={loading || connecting}
            >
                {loading || connecting ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                    <Wallet className="w-5 h-5 mr-2" />
                )}
                Connect Wallet
            </Button>
        </div>
    );
};
