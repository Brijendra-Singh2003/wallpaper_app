// https://vivago.ai/prod-api/content/explore/list/public?page_index=1&page_size=12&order_by=time&media_type=image

import { useEffect, useState } from "react";

const PAGE_SIZE = 24;

export const useWallpapers = () => {
    const [_, reRender] = useState([]);
    const [page, setPage] = useState(1);

    async function getWallpapers(page: number) {
        console.log({page});
        const response = await fetch(`https://vivago.ai/prod-api/content/explore/list/public?page_index=${page}&page_size=${PAGE_SIZE}&order_by=time&media_type=image&tag_id=8`);

        if (response.ok) {
            const data = await response.json();
            const wallpapers = data.result.publications.map((w: any) => ({
                id: w.id,
                uri: `https://storage.vivago.ai/image/${w.image_url}.jpeg`,
                name: w.title,
            }));

            foo = [...foo, ...wallpapers];
            reRender([]);
        }
    }

    function Add() {
        if (foo.length >= (page) * PAGE_SIZE) setPage(page + 1);
    }

    useEffect(() => {
        if (foo.length < page * PAGE_SIZE) getWallpapers(page);
    }, [page]);

    return { wallpapers: foo, Add };
}

let foo: typeof bar = [];

let bar = [
    {
        id: 1,
        uri: "https://plus.unsplash.com/premium_photo-1669295395788-2c22b1431f24",
        name: "Amber",
    },
    {
        id: 2,
        uri: "https://images.unsplash.com/photo-1544961371-516024f8e267",
        name: "Snowy Mountain",
    },
    {
        id: 3,
        uri: "https://images.unsplash.com/photo-1528756514091-dee5ecaa3278",
        name: "Lavender",
    },
    {
        id: 4,
        uri: "https://images.unsplash.com/photo-1576405515541-cb47b7da4fa7",
        name: "Hillslide Rocks",
    },
    {
        id: 5,
        uri: "https://images.unsplash.com/photo-1644542410329-44b2286639d9",
        name: "Mountain Range",
    },
    {
        id: 6,
        uri: "https://plus.unsplash.com/premium_photo-1686050416689-1b1f64fd5000",
        name: "Snowy Road",
    },
    {
        id: 7,
        uri: "https://images.unsplash.com/photo-1583585635793-0e1894c169bd",
        name: "Desert",
    },
    {
        id: 8,
        uri: "https://plus.unsplash.com/premium_photo-1663962390076-af9778b44dff",
        name: "Red Flowers",
    },
];