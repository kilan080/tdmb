import React from 'react';
import './board.css';

export default function Board() {
  return (
    <div className="board">
      <div className="board-header">
            <h2>Leaderboard</h2>
            <div className="twos">
                <p className="dot-all">All Time Edits</p>    
                <p className="dot-week">Edits This Week</p>
            </div>
      </div>
      <div className="content">
        <ol className="leaderboard">
            <li>
                <span className="avatar">
                    <a href="/u/rqphqel">
                        <img src="img-9.webp" alt="" />
                    </a>
                </span>
                <div className="data">
                    <h3>
                        <a href="/u/rqphqel">rqphqel</a>
                    </h3>
                    <div className="meter-all">
                        <div className="guage" style={{ width: '6.537%' }}></div>
                        <h4 className="font-bold">270,685</h4>
                    </div>
                    <div className="meter-this-week">
                        <div className="guage" style={{ width: '100%' }}></div>
                        <h4 className="font-bold">42,651</h4>
                    </div>
                </div>
            </li>

            <li>
                <span className="avatar">
                    <a href="/u/vaugouin">
                        <img src="two.webp" alt="" />
                    </a>
                </span>
                <div className="data">
                    <h3>
                        <a href="/u/vaugouin">Vaugouin</a>
                    </h3>
                    <div className="meter-all">
                        <div className="guage" style={{ width: '11.047%' }}></div>
                        <h4 className="font-bold">457,418</h4>
                    </div>
                    <div className="meter-this-week">
                        <div className="guage" style={{ width: '69.69%' }}></div>
                        <h4 className="font-bold">29,724</h4>
                    </div>
                </div>
            </li>

            <li>
                <span className="avatar">
                    <a href="/u/Romika">
                        <img src="roman.webp" alt="" />
                    </a>
                </span>
                <div className="data">
                    <h3>
                        <a href="/u/Romika">Roman</a>
                    </h3>
                    <div className="meter-all">
                        <div className="guage" style={{ width: '5.574%' }}></div>
                        <h4 className="font-bold">230,811</h4>
                    </div>
                    <div className="meter-this-week">
                        <div className="guage" style={{ width: '53.712%' }}></div>
                        <h4 className="font-bold">22,909</h4>
                    </div>
                </div>
            </li>

            <li>
                <span className="avatar">
                    <a href="/u/enterpr1se">
                        <img src="img-4.jpeg" alt="" />
                    </a>
                </span>
                <div className="data">
                    <h3>
                        <a href="/u/enterpr1se">enterpr1se</a>
                    </h3>
                    <div className="meter-all">
                        <div className="guage" style={{ width: '12.329%' }}></div>
                        <h4 className="font-bold">510,504</h4>
                    </div>
                    <div className="meter-this-week">
                        <div className="guage" style={{ width: '36.322%' }}></div>
                        <h4 className="font-bold">15,492</h4>
                    </div>
                </div>
            </li>

            <li>
                <span className="avatar">
                    <a href="/u/Sheigutn">
                        <img src="img-5.webp" alt="" />
                    </a>
                </span>
                <div className="data">
                    <h3>
                        <a href="/u/Sheigutn">shei</a>
                    </h3>
                    <div className="meter-all">
                        <div className="guage" style={{ width: '12.329%' }}></div>
                        <h4 className="font-bold">1,882,583</h4>
                    </div>
                    <div className="meter-this-week">
                        <div className="guage" style={{ width: '36.322%' }}></div>
                        <h4 className="font-bold">14,535</h4>
                    </div>
                </div>
            </li>

            <li>
                <span className="avatar">
                    <a href="/u/rodrigort">
                        <img src="img-6.webp" alt="" />
                    </a>
                </span>
                <div className="data">
                    <h3>
                        <a href="/u/rodrigort">Rodrigo</a>
                    </h3>
                    <div className="meter-all">
                        <div className="guage" style={{ width: '0.212%' }}></div>
                        <h4 className="font-bold">8,746</h4>
                    </div>
                    <div className="meter-this-week">
                        <div className="guage" style={{ width: '20.354%' }}></div>
                        <h4 className="font-bold">8,681</h4>
                    </div>
                </div>
            </li>

            <li>
                <span className="avatar">
                    <a href="/u/Samara">
                        <img src="img-4.jpeg" alt="" />
                    </a>
                </span>
                <div className="data">
                    <h3>
                        <a href="/u/Samara">Samara</a>
                    </h3>
                    <div className="meter-all">
                        <div className="guage" style={{ width: '100%' }}></div>
                        <h4 className="font-bold">4,140,461</h4>
                    </div>
                    <div className="meter-this-week">
                        <div className="guage" style={{ width: '29.45%' }}></div>
                        <h4 className="font-bold">9,910</h4>
                    </div>
                </div>
            </li>

            <li>
                <span className="avatar">
                    <a href="/u/MrCraftCod">
                        <img src="img-5.webp" alt="" />
                    </a>
                </span>
                <div className="data">
                    <h3>
                        <a href="/u/MrCraftCod">Rakambda</a>
                    </h3>
                    <div className="meter-all">
                        <div className="guage" style={{ width: '0.139%' }}></div>
                        <h4 className="font-bold">5,767</h4>
                    </div>
                    <div className="meter-this-week">
                        <div className="guage" style={{ width: '16.94%' }}></div>
                        <h4 className="font-bold">5,699</h4>
                    </div>
                </div>
            </li>

            <li>
                <span className="avatar">
                    <a href="/u/HeelerCattle86">
                        <img src="img-9.webp" alt="" />
                    </a>
                </span>
                <div className="data">
                    <h3>
                        <a href="/u/HeelerCattle86">HeelerCattle86</a>
                    </h3>
                    <div className="meter-all">
                        <div className="guage" style={{ width: '4.507%' }}></div>
                        <h4 className="font-bold">186,794</h4>
                    </div>
                    <div className="meter-this-week">
                        <div className="guage" style={{ width: '16.588%' }}></div>
                        <h4 className="font-bold">5,582</h4>
                    </div>
                </div>
            </li>

            <li>
                <span className="avatar">
                    <a href="/u/JoyitaPatra1999">
                        <img src="two.webp" alt="" />
                    </a>
                </span>
                <div className="data">
                    <h3>
                        <a href="/u/JoyitaPatra1999">JoyitaPatra1999</a>
                    </h3>
                    <div className="meter-all">
                        <div className="guage" style={{ width: '0.341%' }}></div>
                        <h4 className="font-bold">14,116</h4>
                    </div>
                    <div className="meter-this-week">
                        <div className="guage" style={{ width: '15.558%' }}></div>
                        <h4 className="font-bold">5,234</h4>
                    </div>
                </div>
            </li>
        </ol>
      </div>
    </div>
  );
}
