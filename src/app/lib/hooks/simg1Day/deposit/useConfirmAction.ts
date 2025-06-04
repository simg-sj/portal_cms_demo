import {depositApi} from '@/app/lib/simg1DayApi/deposit/api';

export const useConfirmAction = ({
                                     refetch,
                                     showAlert,
                                     resetNotiThen,
                                 }: {
    refetch: () => void;
    showAlert: (msg: string) => void;
    resetNotiThen: (callback: () => void) => void;
}) => {
    const handleConfirm = async ({
                                     item,
                                     userId,
                                 }: {
        item: any;
        userId: string;
    }) => {
        const param = {
            job: 'DEPOSIT',
            gbn: 'D_COMMIT',
            bpk: item.bpk,
            irpk: item.irpk,
            id: userId,
            bNumber: item.bNumber,
        };

        const { msg } = await depositApi(param);

        resetNotiThen(() => {
            refetch();
            showAlert(msg);
        });
    };

    return { handleConfirm };
};
