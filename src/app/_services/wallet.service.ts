import { Injectable, NgZone } from '@angular/core';
import {
  FunWalletEmbed,
  IsKycVerifiedResponse,
  KycProcessCancelledResponse,
  MessageListeners,
  RestoreAuthenticationCompletedResponse,
  WalletDeviceDeletedLoggedOutResponse,
  WalletInactivityLoggedOutResponse,
} from '@funfair-tech/wallet-sdk';
import window from '@funfair-tech/wallet-sdk/window';
import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private _web3Instance: Web3 | undefined;
  constructor(private _zone: NgZone) {}

  /**
   * Get the web3 instance
   */
  public get web3Instance(): Web3 {
    if (this._web3Instance) {
      return this._web3Instance;
    }

    return new Web3(window.funwallet.sdk.ethereum as any);
  }

  // you call this method when you want to load the wallet
  // this can be on a button click or page load up to how
  // your dApp needs it to act
  public async lazyLoadFunWallet(): Promise<void> {
    await FunWalletEmbed.load({
      initOptions: {
        ngZone: this._zone,
      },
      appId:
        '0x1b084986077d1aedfa1d92318fdcc7d1621fbc92deb390269b94226fd79c0ce6',
      // make sure its in a arrow expression
      // functions so it can get context to `this`
      // when executing your wallet event listener method
      eventListenerCallback: () => {
        this.listenToWalletEvents();
      },
    });
  }

  /**
   * Register follower instance
   * @param followerWindow The follower window
   */
  public async registerFollowerInstance(): Promise<void> {
    await window.funwallet.sdk.registerFollowerInstance();
  }

  /**
   * Listen to events
   */
  public listenToWalletEvents(): void {
    window.funwallet.sdk.ethereum.on('accountsChanged', (accounts) => {
      console.log(
        `EthereumProviderMessage - Accounts:\n${accounts.join('\n')}`,
      );
    });

    window.funwallet.sdk.ethereum.on('chainChanged', (chainId) => {
      console.log(`EthereumProviderMessage chain id changed: ${chainId}`);
    });

    window.funwallet.sdk.ethereum.on('networkChanged', (netId) => {
      console.log(`EthereumProviderMessage network id changed: ${netId}`);
    });

    window.funwallet.sdk.on<RestoreAuthenticationCompletedResponse>(
      MessageListeners.restoreAuthenticationCompleted,
      (result: RestoreAuthenticationCompletedResponse) => {
        if (result.origin === 'https://wallet.funfair.io') {
          StoreService.restoreAuthenticationTaskCompleted.next(true);

          // if the user has been restored authentication then your all good
          // to go again
          if (result.data.isAuthenticated) {
            // result.data.result holds `AuthenticationCompletedResponeData` in for you.
            StoreService.isAuthenticationCompleted.next(true);
          }
        }
      },
    );

    window.funwallet.sdk.on<WalletInactivityLoggedOutResponse>(
      MessageListeners.walletInactivityLoggedOut,
      (result: WalletInactivityLoggedOutResponse) => {
        if (result.origin === 'https://wallet.funfair.io') {
          StoreService.isAuthenticationCompleted.next(false);
        }
      },
    );

    window.funwallet.sdk.on<WalletDeviceDeletedLoggedOutResponse>(
      MessageListeners.walletDeviceDeletedLoggedOut,
      (result: WalletDeviceDeletedLoggedOutResponse) => {
        if (result.origin === 'https://wallet.funfair.io') {
          StoreService.isAuthenticationCompleted.next(false);
        }
      },
    );

    window.funwallet.sdk.on<IsKycVerifiedResponse>(
      MessageListeners.isKycVerified,
      (result: IsKycVerifiedResponse) => {
        if (result.origin === 'https://wallet.funfair.io') {
          if (!result.data.isVerified) {
            window.funwallet.sdk.showFunWalletModal();
          } else {
            window.funwallet.sdk.hideFunWalletModal();
          }
        }
      },
    );

    window.funwallet.sdk.on<KycProcessCancelledResponse>(
      MessageListeners.kycProcessCancelled,
      (result: KycProcessCancelledResponse) => {
        if (result.origin === 'https://wallet.funfair.io') {
          if (result.data.cancelled) {
            window.funwallet.sdk.hideFunWalletModal();
          }
        }
      },
    );
  }

  /**
   * Logout from the wallet
   */
  public async logout(): Promise<void> {
    await window.funwallet.sdk.auth.logout();
    StoreService.isAuthenticationCompleted.next(false);
  }

  /**
   * Start the kyc process
   */
  public async kycModalOpen(): Promise<void> {
    await window.funwallet.sdk.kyc.start();
  }

  /**
   * Login to the fun wallet
   */
  public async login(): Promise<void> {
    try {
      const result = await window.funwallet.sdk.auth.login();
      console.log('Authentication result', result);
      // user all logged in
      StoreService.isAuthenticationCompleted.next(true);
    } catch (error) {
      console.error('User did not sign in');
      return;
    }
  }

  /**
   * Sign a message
   * @param messageText The message text
   */
  public async signAMessage(messageText: string) {
    const ethereumAddress = await window.funwallet.sdk.eth.address();

    const result = await this.web3Instance.eth.personal.sign(
      messageText,
      ethereumAddress,
      'FAKE-PASSWORD', // bad web3 types
    );

    return result;
  }

  /**
   * Send transaction
   * @param tx The transaction
   */
  public async sendTransaction(tx: TransactionConfig) {
    const ethereumAddress = await window.funwallet.sdk.eth.address();
    tx.from = ethereumAddress;

    this.web3Instance.eth
      .sendTransaction(tx)
      .once('transactionHash', (transactionHash) => {
        console.log('Transaction hash test app', transactionHash);
      })
      .on('error', async (error) => {
        console.log(error.message, error);
      });
  }
}
