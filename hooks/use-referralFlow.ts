import { useReferralActions } from '@/hooks/use-referralActions';

import { ReferralActions, ReferralState, Step } from '@/lib/referral';
import { useReferralState } from '@/hooks/use-referralState';
import { useArweaveWalletInit } from './use-wallet';
import { useEffect } from 'react';
import { db } from '@/lib/database';

export interface StepContentProps {
    state: ReferralState;
    actions: ReferralActions;
}

export const useReferralFlow = (initialReferralCode?: string | null) => {
    useArweaveWalletInit();
    const { state, setError, setLoading, updateState } =
        useReferralState(initialReferralCode);

    useEffect(() => {
        const initFlow = async () => {
            try {
                const {
                    data: { session },
                } = await db.supabase.auth.getSession();
                if (session?.user) {
                    const twitterData = {
                        user: {
                            id: session.user.id,
                            twitter_id: session.user.identities?.[0]?.id || '',
                            username: session.user.user_metadata.user_name,
                            name: session.user.user_metadata.full_name,
                        },
                    };
                    updateState({ twitterData, step: Step.WALLET_CONNECT });
                }
            } catch (err) {
                setError((err as Error).message);
            }
        };

        initFlow();
    }, [initialReferralCode]); // Remove updateState and setError from dependencies

    const actions = useReferralActions(
        state,
        updateState,
        setError,
        setLoading,
        initialReferralCode
    );

    return { state, actions };
};
