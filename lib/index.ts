import { deletefiles } from "@masx200/fetch-baidu-pan-files-api";
import findrepeat from "@masx200/mongodb-file-find-md5-repeat";

async function start(
    dbname: string = "baidupan",
    collect: string = "panfile",
    mongourl: string = "mongodb://127.0.0.1:27017/"
) {
    console.log("Find records of duplicate files from the database.");
    // const panenv = await initPANENV();
    const dataarray = await findrepeat(dbname, collect, mongourl);
    // const dataarray = await fsextra.readJSON(jsonfile);
    if (!Array.isArray(dataarray)) {
        throw TypeError("invalid data array");
    }
    const values = Object.values(Object.fromEntries(dataarray));
    const filestodelete = values
        .map((paths) => {
            if (!Array.isArray(paths)) {
                throw TypeError("invalid data array");
            }
            return paths.slice(1);
        })
        .flat();
    console.log("要删除的文件");
    console.log(JSON.stringify(filestodelete, null, 4));
    // 排序一下文件名
    filestodelete.sort();
    await deletefiles(filestodelete);
    console.log("删除文件全部成功!");
}
export { start };
