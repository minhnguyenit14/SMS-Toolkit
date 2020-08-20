import AsyncStorage from '@react-native-community/async-storage';
import config from '@config';
import { showFlashMessage } from './flashMessage';
import logger from './logger';
import { FilterType } from '@containers/Home/constants';
import { RegexFlagType } from '@containers/Home/components/RegexFlagsBtn';

export type CrawlConfig = {
    keyword: string,
    api: string,
    minDate: number,
    filterType: FilterType,
    regexFlags: Array<RegexFlagType>,
    protocol: string
}

const getCrawlConfig = async () => {
    let crawlConfig: Array<CrawlConfig> = [];
    try {
        const response = await AsyncStorage.getItem(config.asyncStorageKey);
        if (response) {
            crawlConfig = JSON.parse(response);
        };
    } catch (e) {
        console.log('get_all_crawl_config', e);
        const message = "Error getting all crawl config\r" + e;
        showFlashMessage({
            type: "danger",
            message
        });
    } finally {
        return crawlConfig;
    }
};

const setCrawlConfig = async (crawConfig: CrawlConfig) => {
    try {
        const filteredConfig = await filterConfig(crawConfig);
        if (filteredConfig !== null) {
            await AsyncStorage.setItem(config.asyncStorageKey, filteredConfig);
        }
    } catch (e) {
        console.log('set_crawl_config', e);
        const message = "Error setting crawl config\r" + e;
        showFlashMessage({
            type: "danger",
            message
        });
    };
};

const filterConfig = async (newCrawConfig: CrawlConfig) => {
    let allCrawlConfig = await getCrawlConfig();
    let canAddNew = true;
    allCrawlConfig = allCrawlConfig.map(crawlConfig => {
        const isExisted =
            crawlConfig.keyword === newCrawConfig.keyword ||
            crawlConfig.api === newCrawConfig.api;
        if (isExisted) {
            canAddNew = false;
            return newCrawConfig;
        };

        return crawlConfig;
    });

    if (canAddNew) {
        allCrawlConfig.push(newCrawConfig);
    }
    console.log(newCrawConfig, allCrawlConfig)
    return JSON.stringify(allCrawlConfig);
};

const removeCrawlConfig = async (callback = (error?: Error) => { }) => {
    try {
        await AsyncStorage.removeItem(config.asyncStorageKey, callback);
    } catch (e) {
        console.log('remove_crawl_config', e);
        const message = "Error removing crawl config\r" + e;
        showFlashMessage({
            type: "danger",
            message
        });
    };
};

const clearAsyncStorage = async (callback = (error?: Error) => { }) => {
    try {
        await AsyncStorage.clear(callback);
    } catch (e) {
        console.log('remove_crawl_config', e);
        const message = "Error clear async storage\r" + e;
        showFlashMessage({
            type: "danger",
            message
        });
    };
};

export {
    getCrawlConfig,
    setCrawlConfig,
    removeCrawlConfig,
    clearAsyncStorage
};