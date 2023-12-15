import { render, screen } from '@testing-library/react';
// import user from '@testing-library/user-event';
import IPlayList from '../playlist/iPlaylist';
import { ReactElement } from 'react';
import { faker } from "@faker-js/faker";
import PlayListPage  from '../playlist/page'
import React from 'react';

jest.mock("../playlist/page", () => 
    jest.fn(() => null)
);

describe('PlayList', () => {
    var playListMock: jest.Mock<any, any, any>;
    var toggleAddPlayListMock: jest.Mock<any, any, any>;
    var toggleUpdatePlayListMock: jest.Mock<any, any, any>;

    function setup(response: IPlayList) {
        window.fetch = jest.fn(() => {
          return Promise.resolve(response);
        }) as jest.Mock;
    
        playListMock = jest.fn();
        toggleAddPlayListMock = jest.fn();
        toggleUpdatePlayListMock = jest.fn();
        React.useContext = jest.fn().mockImplementation(() => playListMock);
        React.useContext = jest.fn().mockImplementation(() => toggleAddPlayListMock);
        React.useContext = jest.fn().mockImplementation(() => toggleUpdatePlayListMock);
      }

    it("On initial render with no playlist page", async () => {
        const component = PlayListPage();
        const { container } = render(component as ReactElement);
        expect(container.querySelector("h2")?.innerHTML).toBe("there are no playlist in the Database");
    })

    it("On initial render with a playlist available in the database", async () => {
        const playList: IPlayList = { 
            name: faker.string.alphanumeric(), 
            movies: [faker.string.alphanumeric()]
        };
        setup(playList);
        expect(playListMock).toHaveBeenCalledWith(playList); 

        const component = PlayListPage();
        render(component as ReactElement);
        const titleElement = await screen.findByTestId("title");
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.innerHTML).toBe("PlayList");

        const tableElement = await screen.getByRole('table');
        expect(tableElement).toBeInTheDocument();

        const buttonElement = await screen.findAllByRole('button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toEqual(3);
    })

    it("On addplaylist a new playlist is added", async () => {
        const playList: IPlayList = { name: faker.string.alphanumeric(), movies: [faker.string.alphanumeric()]};
        const component = PlayListPage();
        render(component as ReactElement);
        
        const btnAddElement = await screen.findByTestId("btnAddPlayList");
        expect(btnAddElement).toBeInTheDocument();

        expect(toggleAddPlayListMock).toHaveBeenCalledWith(true);
    })

    it("On removeplaylist a playlist is deleted", async () => {
        const component = PlayListPage();
        render(component as ReactElement);
        const btnDeleteElement = await screen.findByTestId("btnDeletePlayList");
        expect(btnDeleteElement).toBeInTheDocument();
    })

    it("On updateplaylist a playlist is updated", async () => {
        const playList: IPlayList = { name: faker.string.alphanumeric(), movies: [faker.string.alphanumeric()]};
        const component = PlayListPage();
        render(component as ReactElement);
        const btnDeleteElement = await screen.findByTestId("btnUpdatePlayList");
        expect(btnDeleteElement).toBeInTheDocument();

        expect(toggleUpdatePlayListMock).toHaveBeenCalledWith(true);
    })
})